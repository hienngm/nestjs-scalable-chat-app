import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import * as resolvers from 'src/resolvers';
import * as scalars from 'src/configs/modules/graphql/scalars';
import { AuthModule } from 'src/use-cases/auth/auth.module';
import { EnvConfigModule } from './configs/env/env.module';
import { GraphQLConfig } from './configs/modules/graphql/graphql.config';
import { MessageModule } from './use-cases/message/message.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
    EnvConfigModule,
    AuthModule,
    MessageModule,
  ],
  providers: [...Object.values(resolvers), ...Object.values(scalars)],
})
export class AppModule {}
