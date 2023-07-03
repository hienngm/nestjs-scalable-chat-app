import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ISubscriber, IAuthUser } from 'src/common/interfaces';
import {
  DATA_SERVICE_TOKEN,
  IDataService,
  IPubSubService,
  IPublishChannelMessageParams,
  IPublishDirectMessageParams,
} from 'src/core/interfaces';
import { RENEW_AUTH_DATA_STATUS } from 'src/constants/event.constant';
import { EventFactory } from 'src/utils';
import { IEvent } from 'src/core/interfaces/events';

const PUB_SUB_TOKEN = Symbol('PUB_SUB_TOKEN');

@Injectable()
class GraphQLSubscriptionService implements IPubSubService {
  private readonly subscribersAuthDatas = new Map<string, ISubscriber>();

  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private readonly dataService: IDataService,
    @Inject(PUB_SUB_TOKEN)
    private readonly pubSub: PubSub,
  ) {}

  async publishDirectMessageEvent(
    params: IPublishDirectMessageParams,
  ): Promise<void> {
    const { message } = params;

    await this.publishEventToUser({
      userId: message.receiverId,
      event: EventFactory.createDirectMessageEvent({
        message,
      }),
    });
  }

  async publishChannelMessageEvent(
    params: IPublishChannelMessageParams,
  ): Promise<void> {
    const { channelId, message } = params;
    const users = await this.dataService.users.findByChannelId(channelId);

    await Promise.all(
      users.map((user) =>
        this.publishEventToUser({
          userId: user.id,
          event: EventFactory.createChannelMessageEvent({
            channelId,
            message,
          }),
        }),
      ),
    );
  }

  renewSubscriberAuthData(params: { user: IAuthUser; subscriberId: string }) {
    const { user, subscriberId } = params;
    const { id: userId } = user;
    const subscriberAuthData = this.subscribersAuthDatas.get(subscriberId);

    if (!subscriberAuthData) {
      throw new BadRequestException('Invalid subscriberId');
    }

    if (userId !== subscriberAuthData.userId) {
      throw new BadRequestException('Invalid subscriberId');
    }

    this.subscribersAuthDatas.set(subscriberId, {
      ...subscriberAuthData,
      tokenExpireAt: user.exp,
    });

    const authTopic = this.getAuthTopic(subscriberId);
    this.pubSub.publish(authTopic, {
      renewAuthDataStatus: RENEW_AUTH_DATA_STATUS.SUCCESS,
    });

    return RENEW_AUTH_DATA_STATUS.SUCCESS;
  }

  subscribeToEventTopic(subscriber: ISubscriber) {
    const { id: subscriberId, userId } = subscriber;

    this.subscribersAuthDatas.set(subscriberId, subscriber);
    subscriber.onDisconnect = () => this.onDisconnect(subscriberId);

    const eventTopic = this.getEventTopic(userId);
    return this.pubSub.asyncIterator(eventTopic);
  }

  subscribeToAuthEvent(subscriber: ISubscriber) {
    const { userId } = subscriber;

    const eventTopic = this.getEventTopic(userId);
    return this.pubSub.asyncIterator(eventTopic);
  }

  async publishEventToUser(params: { userId: string; event: IEvent }) {
    const { userId, event } = params;

    const eventTopic = this.getEventTopic(userId);

    return this.pubSub.publish(eventTopic, event);
  }

  async shouldPublishEventToSubscriber(params: {
    subscriberId: string;
  }): Promise<boolean> {
    const { subscriberId } = params;
    const authData = await this.subscribersAuthDatas.get(subscriberId);
    if (!authData) {
      throw new UnauthorizedException();
    }

    const isAuthDataValid = this.checkAuthDataValid(subscriberId);
    if (isAuthDataValid) {
      return true;
    }

    const canRenewAuthData = await this.canRenewAuthData(subscriberId);
    if (!canRenewAuthData) {
      throw new UnauthorizedException();
    }

    return true;
  }

  checkAuthDataValid(subscriberId: string): boolean {
    const authData = this.subscribersAuthDatas.get(subscriberId);
    if (!authData) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    const { tokenExpireAt } = authData;
    return tokenExpireAt >= now;
  }

  getEventTopic(userId: string) {
    return `event:${userId}`;
  }

  getAuthTopic(subscriberId: string) {
    return `auth:${subscriberId}`;
  }

  async canRenewAuthData(subscriberId: string): Promise<boolean> {
    let hasUnsubscribed = false;

    return new Promise<boolean>(async (resolve) => {
      const handlePayload = (payload: { renewAuthDataStatus: string }) => {
        const { renewAuthDataStatus } = payload;
        this.pubSub.unsubscribe(subscriptionId);
        hasUnsubscribed = true;
        resolve(renewAuthDataStatus === RENEW_AUTH_DATA_STATUS.SUCCESS);
      };

      const subscriptionId = await this.pubSub.subscribe(
        this.getAuthTopic(subscriberId),
        handlePayload,
      );

      const authData = this.subscribersAuthDatas.get(subscriberId);
      if (!authData) {
        throw new Error('Auth data not found');
      }

      const eventTopic = this.getEventTopic(authData.userId);
      const renewAuthDataEvent = EventFactory.createRenewAuthDataEvent({
        subscriberId,
      });

      await this.pubSub.publish(eventTopic, renewAuthDataEvent);

      const unsubscribe = () => {
        if (!hasUnsubscribed) {
          this.pubSub.unsubscribe(subscriptionId);
          resolve(false);
        }
      };

      // Unsubscribe auth topic if subscriber can't renew auth data after 30s
      setTimeout(unsubscribe, 30000);
    });
  }

  onDisconnect(subscriberId: string) {
    this.subscribersAuthDatas.delete(subscriberId);
  }
}

export { PUB_SUB_TOKEN, GraphQLSubscriptionService };
