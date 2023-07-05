import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlOptionsFactory, SubscriptionConfig } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { Context } from 'graphql-ws';
import { join } from 'path';
import * as crypto from 'crypto';
import * as _ from 'lodash';

import { IAuthUser, ISubscriber } from 'src/common/interfaces';
import { EnvConfigService } from 'src/configs/env/env.service';
import { PUBSUB_SERVICE_PROVIDER } from 'src/constants';

@Injectable()
export class GraphQLConfig implements GqlOptionsFactory {
  constructor(
    private jwtService: JwtService,
    private envConfig: EnvConfigService,
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    const pubSubServiceProvider = this.envConfig.getPubSubServiceProvider();
    let subscriptions: SubscriptionConfig | null = null;

    if (
      pubSubServiceProvider === PUBSUB_SERVICE_PROVIDER.GRAPHQL_SUBSCRIPTION
    ) {
      subscriptions = {
        'graphql-ws': {
          path: '/subscriptions',
          onConnect: async (context: Context<any>) => {
            const { connectionParams } = context;
            const extra: any = context.extra;
            const authToken = connectionParams.authToken;
            if (!_.isString(authToken)) {
              throw new UnauthorizedException();
            }

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
          onDisconnect: async (context: Context<any>) => {
            const extra: any = context.extra;
            const subscriber: ISubscriber = extra.subscriber;

            if (subscriber.onDisconnect) {
              await subscriber.onDisconnect();
            }
          },
        },
      };
    }

    return {
      autoSchemaFile: join(process.cwd(), 'src/graphql-schemas/schema.gql'),
      subscriptions,
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
