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

  @Subscription(() => EventUnion, {
    name: 'listenToEvents',
    filter: function (...args) {
      const self = this as SubscriptionResolver;
      return self.eventFilter(...args);
    },
  })
  async subscribeToEventsTopic(@Context('subscriber') subscriber: ISubscriber) {
    return this.subscriptionService.subscribeToEventsTopic(subscriber);
  }

  private async eventFilter(
    event: Event,
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
