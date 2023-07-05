import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import * as crypto from 'crypto';
import { Socket, Server, RemoteSocket } from 'socket.io';
import { IAuthUser, ISubscriber } from 'src/common/interfaces';
import {
  DATA_SERVICE_TOKEN,
  IDataService,
  IPubSubService,
  IPublishChannelMessageParams,
  IPublishDirectMessageParams,
} from 'src/core/interfaces';
import { IEvent } from 'src/core/interfaces/events';
import { EventFactory } from 'src/utils';

@Injectable()
export class SocketIOService implements IPubSubService {
  private readonly eventTopic = 'event';
  private _webSocketServer: Server | null;

  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private readonly dataService: IDataService,
    private readonly jwtService: JwtService,
  ) {}

  async publishChannelMessageEvent(
    params: IPublishChannelMessageParams,
  ): Promise<void> {
    const { channelId, message } = params;

    const users = await this.dataService.users.findByChannelId(channelId);

    await Promise.all(
      users.map((user) =>
        this.publishEventToUser({
          userId: user.id,
          event: EventFactory.createChannelMessageEvent({
            channelId,
            message,
          }),
        }),
      ),
    );
  }

  async publishDirectMessageEvent(
    params: IPublishDirectMessageParams,
  ): Promise<void> {
    const { message } = params;

    await this.publishEventToUser({
      userId: message.receiverId,
      event: EventFactory.createDirectMessageEvent({
        message,
      }),
    });
  }

  afterGatewayInit(server: Server) {
    this.webSocketServer = server;
  }

  async handleConnection(client: Socket) {
    const authToken = client.handshake.auth.token;
    if (!_.isString(authToken)) {
      client.disconnect();
    }

    const isValidToken = await this.isValidToken(authToken);
    if (!isValidToken) {
      client.disconnect();
    }

    const user = this.parseToken(authToken);

    const userRoomName = this.getUserRoomName(user.id);
    client.join(userRoomName);

    const subscriber: ISubscriber = {
      id: crypto.randomUUID(),
      userId: user.id,
      username: user.username,
      tokenExpireAt: user.exp,
    };
    client.data.subscriber = subscriber;
  }

  handleDisconnect(client: Socket) {
    console.log(`Subscriber ${client.data.subscriber?.id} has disconnected`);
  }

  private async publishEventToUser(params: { userId: string; event: IEvent }) {
    const { userId, event } = params;

    const userRoomName = this.getUserRoomName(userId);

    const clients = await this.webSocketServer.in(userRoomName).fetchSockets();

    await Promise.all(
      clients.map((client) =>
        this.publishEventToWebSocketClient({ client, event }),
      ),
    );
  }

  private async publishEventToWebSocketClient(params: {
    client: RemoteSocket<any, any>;
    event: IEvent;
  }) {
    const { client, event } = params;
    const subscriber: ISubscriber | undefined = client.data.subscriber;
    if (!subscriber) {
      client.disconnect();
    }

    const isSubscriberAuthDataValid =
      this.isSubscriberAuthDataValid(subscriber);

    if (isSubscriberAuthDataValid) {
      client.emit(this.eventTopic, event);
      return;
    }

    const canRenewSubscriberAuthData = await this.canRenewSubscriberAuthData(
      client,
    );

    if (!canRenewSubscriberAuthData) {
      client.disconnect();
    }

    client.emit(this.eventTopic, event);
  }

  private isSubscriberAuthDataValid(subscriber: ISubscriber) {
    const { tokenExpireAt } = subscriber;
    const now = Math.floor(Date.now() / 1000);
    return tokenExpireAt >= now;
  }

  private async canRenewSubscriberAuthData(
    client: RemoteSocket<any, any>,
  ): Promise<boolean> {
    const subscriber: ISubscriber = client.data.subscriber;
    const authEvent = EventFactory.createRenewAuthDataEvent({
      subscriberId: subscriber.id,
    });

    const renewAuthDataTimeOut = 30000; // 30s

    return new Promise((resolve) => {
      client
        .timeout(renewAuthDataTimeOut)
        .emit(this.eventTopic, authEvent, async (err, response) => {
          const authToken = response?.authToken;
          if (err || !_.isString(authToken)) {
            return resolve(false);
          }

          const isValidToken = await this.isValidToken(authToken);
          if (!isValidToken) {
            return resolve(false);
          }

          const user = this.parseToken(authToken);
          this.renewSubscriberAuthData({ client, user });

          return resolve(true);
        });
    });
  }

  private renewSubscriberAuthData(params: {
    client: RemoteSocket<any, any>;
    user: IAuthUser;
  }) {
    const { client, user } = params;

    const newSubscriber: ISubscriber = {
      ...client.data.subscriber,
      tokenExpireAt: user.exp,
    };

    client.data.subscriber = newSubscriber;
  }

  private getUserRoomName(userId: string) {
    return `event:${userId}`;
  }

  private async isValidToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  private parseToken(token: string): IAuthUser {
    const payload: any = this.jwtService.decode(token);

    return {
      id: payload.sub,
      username: payload.username,
      exp: payload.exp,
    };
  }

  private get webSocketServer() {
    if (!this._webSocketServer) {
      throw new Error('Websocket server is not found');
    }

    return this._webSocketServer;
  }

  private set webSocketServer(server: Server) {
    this._webSocketServer = server;
  }
}
