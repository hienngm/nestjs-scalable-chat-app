import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis, { RedisOptions } from 'ioredis';
import { EnvConfigService } from 'src/configs/env/env.service';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(
    app: INestApplicationContext,
    private readonly envConfigService: EnvConfigService,
  ) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const options: RedisOptions = {
      retryStrategy: (times) => {
        // reconnect after
        return Math.min(times * 50, 2000);
      },
    };
    const redisConnectionString =
      this.envConfigService.getRedisConnectionString();
    const pubClient = new Redis(redisConnectionString, options);
    const subClient = new Redis(redisConnectionString, options);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
