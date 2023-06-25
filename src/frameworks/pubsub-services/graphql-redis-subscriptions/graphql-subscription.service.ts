import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ISubscriber, IAuthUser } from 'src/common/interfaces';
import { DATA_SERVICE_TOKEN, IDataService } from 'src/core/interfaces';
import { RENEW_AUTH_DATA_STATUS, EVENT_TYPES } from './constants';

@Injectable()
export class GraphQLSubscriptionService {
  private readonly subscribersAuthDatas = new Map<string, ISubscriber>();
  private readonly userSubscriberIds = new Map<string, string[]>();

  constructor(
    private readonly pubSub: PubSub,
    @Inject(DATA_SERVICE_TOKEN)
    private readonly dataService: IDataService,
  ) {}

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
    const asyncIterator = this.pubSub.asyncIterator(eventsTopic);

    const userSubscriberIds = this.userSubscriberIds.get(userId) ?? [];
    this.userSubscriberIds.set(userId, [...userSubscriberIds, subscriberId]);

    this.subscribersAuthDatas.set(subscriberId, {
      ...subscriber,
      asyncIterator,
    });

    return asyncIterator;
  }

  async publishEventToUser(params: { userId: string; event: any }) {
    const { userId, event } = params;

    const userSubscriberIds = this.userSubscriberIds.get(userId) ?? [];

    const publishEventPromises = userSubscriberIds.map((subscriberId) =>
      this.publishEventToSubscriber({ subscriberId, event }),
    );

    await Promise.all(publishEventPromises);
  }

  async publishEventToSubscriber(params: {
    event: any;
    subscriberId: string;
  }): Promise<void> {
    const { subscriberId, event } = params;
    const authData = await this.subscribersAuthDatas.get(subscriberId);
    if (!authData) {
      throw new Error('Auth data not found');
    }

    const { userId } = authData;

    const eventsTopic = this.getEventsTopic(userId);
    const isAuthDataValid = this.checkAuthDataValid(subscriberId);

    if (isAuthDataValid) {
      this.pubSub.publish(eventsTopic, event);
      return;
    }

    try {
      const canRenewAuthData = await this.canRenewAuthData(subscriberId);
      if (!canRenewAuthData) {
        throw new Error('Unauthorized');
      }

      this.pubSub.publish(eventsTopic, event);
    } catch (error) {
      authData.asyncIterator.throw(error);
    }
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
      await this.pubSub.publish(eventsTopic, {
        type: EVENT_TYPES.RENEW_AUTH_DATA,
        payload: {
          subscriberId,
        },
      });

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
