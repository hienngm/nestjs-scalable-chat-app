import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getAccessJwtSecret(): string {
    return this.configService.get<string>('ACCESS_JWT_SECRET');
  }

  getAccessJwtExpirationTime(): string {
    return this.configService.get<string>('ACCESS_JWT_EXPIRATION_TIME');
  }

  getRefreshJwtSecret(): string {
    return this.configService.get<string>('REFRESH_JWT_SECRET');
  }

  getRefreshJwtExpirationTime(): string {
    return this.configService.get<string>('REFRESH_JWT_EXPIRATION_TIME');
  }

  getMongoDBConnectionString(): string {
    return this.configService.get<string>('MONGODB_CONNECTION_STRING');
  }

  getRedisConnectionString(): string {
    return this.configService.get<string>('REDIS_CONNECTION_STRING');
  }

  getPubSubServiceProvider(): string {
    return this.configService.get<string>('PUBSUB_SERVICE_PROVIDER');
  }
}
