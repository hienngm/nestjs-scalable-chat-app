import { Module } from '@nestjs/common';
import { SubscriptionResolver } from './graphql-subscription.resolver';
import { GraphQLSubscriptionService } from './graphql-subscription.service';

@Module({
  providers: [SubscriptionResolver, GraphQLSubscriptionService],
})
export class GraphQLSubscriptionModule {}
