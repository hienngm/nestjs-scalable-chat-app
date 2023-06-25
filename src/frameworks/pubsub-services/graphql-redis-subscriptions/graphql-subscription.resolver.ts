import {
  Subscription,
  Resolver,
  Context,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ISubscriber, IAuthUser } from 'src/common/interfaces';
import { GraphQLSubscriptionService } from './graphql-subscription.service';

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

  @Subscription(() => String, { name: 'events' })
  async subscribeToEvents(@Context('subscriber') subscriber: ISubscriber) {
    return this.subscriptionService.subscribeToEvents(subscriber);
  }
}
