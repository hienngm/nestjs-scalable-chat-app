import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { NODE_ENV, PUBSUB_SERVICE_PROVIDER } from 'src/constants';

class Env {
  // APPLICATION
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV;

  // JWT
  @IsString()
  @IsNotEmpty()
  ACCESS_JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  ACCESS_JWT_EXPIRATION_TIME: string;

  @IsString()
  @IsNotEmpty()
  REFRESH_JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  REFRESH_JWT_EXPIRATION_TIME: string;

  // DATABASE
  @IsString()
  @IsNotEmpty()
  MONGODB_CONNECTION_STRING: string;

  // REDIS
  @IsString()
  @IsNotEmpty()
  REDIS_CONNECTION_STRING: string;

  // PUBSUB SERVICE PROVIDER
  @IsEnum(PUBSUB_SERVICE_PROVIDER)
  PUBSUB_SERVICE_PROVIDER: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(Env, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
