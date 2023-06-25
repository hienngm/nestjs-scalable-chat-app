import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import * as resolvers from 'src/resolvers';
import { AuthModule } from 'src/use-cases/auth/auth.module';
import { EnvConfigModule } from './configs/env/env.module';
import { GraphQLConfig } from './configs/modules/graphql/graphql.config';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
    EnvConfigModule,
    AuthModule,
  ],
  providers: [...Object.values(resolvers)],
})
export class AppModule {}
