import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';
import { EnvConfigService } from 'src/configs/env/env.service';
import { PUB_SUB_TOKEN } from './graphql-subscription.service';

@Module({
  providers: [
    {
      provide: PUB_SUB_TOKEN,
      useFactory: (envConfigService: EnvConfigService) => {
        const options: RedisOptions = {
          retryStrategy: (times) => {
            // reconnect after
            return Math.min(times * 50, 2000);
          },
        };
        const redisConnectionString =
          envConfigService.getRedisConnectionString();

        return new RedisPubSub({
          publisher: new Redis(redisConnectionString, options),
          subscriber: new Redis(redisConnectionString, options),
        });
      },
      inject: [EnvConfigService],
    },
  ],
  exports: [PUB_SUB_TOKEN],
})
export class RedisPubSubModule {}
