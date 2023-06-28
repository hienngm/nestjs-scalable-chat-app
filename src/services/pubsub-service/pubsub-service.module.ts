import { Module } from '@nestjs/common';
import { GraphQLSubscriptionModule } from 'src/frameworks/pubsub-services/graphql-redis-subscriptions/graphql-subscription.module';

@Module({
  imports: [GraphQLSubscriptionModule],
  exports: [GraphQLSubscriptionModule],
})
export class PubSubServiceModule {}
