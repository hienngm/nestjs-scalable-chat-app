import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { SocketIOService } from './socket.io.service';

@WebSocketGateway({
  cors: { origin: '*' },
  path: '/subscriptions',
})
export class SocketIOGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketIOService: SocketIOService) {}

  afterInit(server: Server) {
    return this.socketIOService.afterGatewayInit(server);
  }

  handleConnection(client: Socket) {
    return this.socketIOService.handleConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.socketIOService.handleDisconnect(client);
  }
}
