import {
  Subscription,
  Resolver,
  Context,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ISubscriber, IAuthUser } from 'src/common/interfaces';
import { GraphQLSubscriptionService } from './graphql-subscription.service';
import { EVENT_TYPES } from './constants';
import { IEvent } from 'src/utils';

@Resolver()
export class SubscriptionResolver {
  constructor(
    private readonly subscriptionService: GraphQLSubscriptionService,
  ) {}

  @Mutation(() => String, { name: 'renewSubscriberAuthData' })
  async renewSubscriberAuthData(
    @Context('user') user: IAuthUser,
    @Args('subscriberId') subscriberId: string,
  ) {
    return this.subscriptionService.renewSubscriberAuthData({
      user,
      subscriberId,
    });
  }

  @Subscription(() => String, {
    name: 'events',
    filter: function (...args) {
      const self = this as SubscriptionResolver;
      return self.eventFilter(...args);
    },
  })
  async subscribeToEvents(@Context('subscriber') subscriber: ISubscriber) {
    return this.subscriptionService.subscribeToEvents(subscriber);
  }

  private async eventFilter(
    event: IEvent,
    _variables: any,
    context: { subscriber: ISubscriber },
  ): Promise<boolean> {
    if (event.type === EVENT_TYPES.RENEW_AUTH_DATA) {
      return true;
    }

    const { subscriber } = context;
    return this.subscriptionService.shouldPublishEventToSubscriber({
      subscriberId: subscriber.id,
    });
  }
}
