import { Module } from '@nestjs/common';
import { PUBSUB_SERVICE_TOKEN } from 'src/core/interfaces';
import { DataServiceModule } from 'src/services/data-service/data-service.module';
import { SocketIOGateway } from './socket.io.gateway';
import { SocketIOService } from './socket.io.service';

@Module({
  imports: [DataServiceModule],
  providers: [
    SocketIOGateway,
    SocketIOService,
    {
      useExisting: SocketIOService,
      provide: PUBSUB_SERVICE_TOKEN,
    },
  ],
  exports: [PUBSUB_SERVICE_TOKEN],
})
export class SocketIOModule {}
