import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './configs/env/env.service';
import { PUBSUB_SERVICE_PROVIDER } from './constants';
import { RedisIoAdapter } from './frameworks/pubsub-services/socket.io/redis.io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const envService = app.get(EnvConfigService);
  const pubsubProvider = envService.getPubSubServiceProvider();

  if (pubsubProvider === PUBSUB_SERVICE_PROVIDER['SOCKET.IO']) {
    const redisIoAdapter = new RedisIoAdapter(app, envService);
    await redisIoAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIoAdapter);
  }

  await app.listen(3000);
}
bootstrap();
