import { Module } from '@nestjs/common';
import { PUBSUB_SERVICE_PROVIDER } from 'src/constants';
import { GraphQLSubscriptionModule } from 'src/frameworks/pubsub-services/graphql-redis-subscriptions/graphql-subscription.module';
import { SocketIOModule } from 'src/frameworks/pubsub-services/socket.io/socket.io.module';

const pubsubModuleProvider =
  process.env.PUBSUB_SERVICE_PROVIDER === PUBSUB_SERVICE_PROVIDER['SOCKET.IO']
    ? SocketIOModule
    : GraphQLSubscriptionModule;

@Module({
  imports: [pubsubModuleProvider],
  exports: [pubsubModuleProvider],
})
export class PubSubServiceModule {}
