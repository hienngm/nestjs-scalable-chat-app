import { Module } from '@nestjs/common';
import { MessageUseCase } from './message.use-case';
import { DataServiceModule } from 'src/services/data-service/data-service.module';
import { PubSubServiceModule } from 'src/services/pubsub-service/pubsub-service.module';

@Module({
  imports: [DataServiceModule, PubSubServiceModule],
  providers: [MessageUseCase],
  exports: [MessageUseCase],
})
export class MessageModule {}
