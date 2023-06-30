import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
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
        // 'graphql-ws': true,
        // Backward compatibility
        'subscriptions-transport-ws': {
          onConnect: async (
            connectionParams,
          ): Promise<{ subscriber: ISubscriber }> => {
            const authToken = connectionParams.authToken;
            const isValidToken = this.isValidToken(authToken);

            if (!isValidToken) {
              throw new UnauthorizedException();
            }

            const user = this.parseToken(authToken);

            return {
              subscriber: {
                id: crypto.randomUUID(),
                userId: user.id,
                username: user.username,
                tokenExpireAt: user.exp,
              },
            };
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
    return this.jwtService.decode(token) as IAuthUser;
  }
}
