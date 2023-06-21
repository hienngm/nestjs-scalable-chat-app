import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import * as resolvers from 'src/resolvers';
import { AuthModule } from 'src/use-cases/auth/auth.module';
import { EnvConfigModule } from './configs/env/env.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    EnvConfigModule,
    AuthModule,
  ],
  providers: [...Object.values(resolvers)],
})
export class AppModule {}
