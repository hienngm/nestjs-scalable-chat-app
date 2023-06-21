import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './env.service';
import { validate } from './env-validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
