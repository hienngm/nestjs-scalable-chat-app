import { Module } from '@nestjs/common';
import { SubscriptionResolver } from './graphql-subscription.resolver';
import { GraphQLSubscriptionService } from './graphql-subscription.service';
import { PUBSUB_SERVICE_TOKEN } from 'src/core/interfaces';
import { DataServiceModule } from 'src/services/data-service/data-service.module';

@Module({
  imports: [DataServiceModule],
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
