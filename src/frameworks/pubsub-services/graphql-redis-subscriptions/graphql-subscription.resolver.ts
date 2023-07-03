import { UseGuards } from '@nestjs/common';
import {
  Subscription,
  Resolver,
  Context,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ISubscriber, IAuthUser } from 'src/common/interfaces';
import { GraphQLSubscriptionService } from './graphql-subscription.service';
import { EVENT_TYPES } from 'src/constants';
import { EventUnion } from './resolve-types';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { IAuthEvent, IEvent } from 'src/core/interfaces/events';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RenewAuthDataEvent } from './events';

@Resolver()
export class SubscriptionResolver {
  constructor(
    private readonly subscriptionService: GraphQLSubscriptionService,
  ) {}

  @Mutation(() => String, { name: 'renewSubscriberAuthData' })
  @UseGuards(GqlAuthGuard)
  async renewSubscriberAuthData(
    @CurrentUser() user: IAuthUser,
    @Args('subscriberId') subscriberId: string,
  ) {
    return this.subscriptionService.renewSubscriberAuthData({
      user,
      subscriberId,
    });
  }

  @Subscription(() => EventUnion, {
    name: 'event',
    filter: function (this: SubscriptionResolver, ...args) {
      return this.eventFilter(...args);
    },
    resolve: (event) => event,
  })
  async subscribeToEventTopic(@Context() context: any) {
    const subscriber: ISubscriber = context.req.extra.subscriber;
    return this.subscriptionService.subscribeToEventTopic(subscriber);
  }

  @Subscription(() => RenewAuthDataEvent, {
    name: 'authEvent',
    filter: function (this: SubscriptionResolver, event) {
      return this.authEventFilter(event);
    },
    resolve: (event) => event,
  })
  async subscribeToAuthEvent(@Context() context: any) {
    const subscriber: ISubscriber = context.req.extra.subscriber;
    return this.subscriptionService.subscribeToAuthEvent(subscriber);
  }

  private async eventFilter(
    event: IEvent | IAuthEvent,
    _variables: any,
    context: any,
  ): Promise<boolean> {
    if (event.type === EVENT_TYPES.RENEW_AUTH_DATA) {
      return false;
    }

    const { subscriber, socket } = context.req.extra;

    try {
      const shouldPublishEventToSubscriber =
        await this.subscriptionService.shouldPublishEventToSubscriber({
          subscriberId: subscriber.id,
        });

      return shouldPublishEventToSubscriber;
    } catch (e) {
      await socket.close();
      return false;
    }
  }

  private authEventFilter(event: IEvent | IAuthEvent): boolean {
    if (event.type === EVENT_TYPES.RENEW_AUTH_DATA) {
      return true;
    }
    return false;
  }
}
