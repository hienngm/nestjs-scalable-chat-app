import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { NODE_ENV } from 'src/constants';

class Env {
  // APPLICATION
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV;

  // JWT
  @IsString()
  ACCESS_JWT_SECRET: string;

  @IsString()
  ACCESS_JWT_EXPIRATION_TIME: string;

  @IsString()
  REFRESH_JWT_SECRET: string;

  @IsString()
  REFRESH_JWT_EXPIRATION_TIME: string;

  // DATABASE
  @IsString()
  MONGODB_CONNECTION_STRING: string;
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
