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
} from 'src/core/interfaces';
import { RENEW_AUTH_DATA_STATUS } from './constants';
import { User } from 'src/frameworks/data-services/mongoose/schemas';
import { EventFactory, IEvent } from 'src/utils';

@Injectable()
export class GraphQLSubscriptionService implements IPubSubService {
  private readonly subscribersAuthDatas = new Map<string, ISubscriber>();
  private readonly pubSub: PubSub = new PubSub();

  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private readonly dataService: IDataService,
  ) {}

  async publishChannelMessage(
    params: IPublishChannelMessageParams,
  ): Promise<void> {
    const { channelId, message } = params;
    const users: User[] = await this.dataService.users.findByChannelId(
      channelId,
    );

    await Promise.all(
      users.map((user) =>
        this.publishEventToUser({
          userId: String(user._id),
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
    const { sub: userId } = user;
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
  }

  subscribeToEvents(subscriber: ISubscriber) {
    const { id: subscriberId, userId } = subscriber;
    const eventsTopic = this.getEventsTopic(userId);

    this.subscribersAuthDatas.set(subscriberId, subscriber);

    return this.pubSub.asyncIterator(eventsTopic);
  }

  async publishEventToUser(params: { userId: string; event: IEvent }) {
    const { userId, event } = params;

    const eventTopic = this.getEventsTopic(userId);
    this.pubSub.publish(eventTopic, event);
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

    const now = Number(new Date());
    const { tokenExpireAt } = authData;
    return tokenExpireAt >= now;
  }

  getEventsTopic(userId: string) {
    return `events:${userId}`;
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

      const eventsTopic = this.getEventsTopic(authData.userId);
      const renewAuthDataEvent = EventFactory.createRenewAuthDataEvent({
        subscriberId,
      });
      await this.pubSub.publish(eventsTopic, renewAuthDataEvent);

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
}
