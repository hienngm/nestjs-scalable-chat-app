import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { Context } from 'graphql-ws';
import { join } from 'path';
import * as crypto from 'crypto';

import { IAuthUser, ISubscriber } from 'src/common/interfaces';

@Injectable()
export class GraphQLConfig implements GqlOptionsFactory {
  constructor(private jwtService: JwtService) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
          onConnect: async (context: Context<any>) => {
            const { connectionParams } = context;
            const extra: any = context.extra;
            const authToken = connectionParams.authToken;
            const isValidToken = await this.isValidToken(authToken);

            if (!isValidToken) {
              throw new UnauthorizedException();
            }

            const user = this.parseToken(authToken);

            const subscriber: ISubscriber = {
              id: crypto.randomUUID(),
              userId: user.id,
              username: user.username,
              tokenExpireAt: user.exp,
            };
            extra.subscriber = subscriber;
          },
          onDisconnect: (context: Context<any>) => {
            const extra: any = context.extra;
            const subscriber: ISubscriber = extra.subscriber;

            if (subscriber.onDisconnect) {
              subscriber.onDisconnect();
            }
          },
        },
      },
    };
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
}
