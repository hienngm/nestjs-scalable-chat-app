import { Module } from '@nestjs/common';
import { SubscriptionResolver } from './graphql-subscription.resolver';
import { GraphQLSubscriptionService } from './graphql-subscription.service';
import { PUBSUB_SERVICE_TOKEN } from 'src/core/interfaces';
import { DataServiceModule } from 'src/services/data-service/data-service.module';
import { RedisPubSubModule } from './redis-pubsub.module';

@Module({
  imports: [DataServiceModule, RedisPubSubModule],
  providers: [
    SubscriptionResolver,
    GraphQLSubscriptionService,
    {
      useExisting: GraphQLSubscriptionService,
      provide: PUBSUB_SERVICE_TOKEN,
    },
  ],
  exports: [PUBSUB_SERVICE_TOKEN],
})
export class GraphQLSubscriptionModule {}
