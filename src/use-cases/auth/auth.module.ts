import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUseCase } from './auth.user-case';
import { DataServiceModule } from 'src/services/data-service/data-service.module';
import { AccessJwtConfig, AccessJwtStrategy } from 'src/configs/modules/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: AccessJwtConfig,
      global: true,
    }),
    DataServiceModule,
  ],
  providers: [AccessJwtStrategy, AuthUseCase],
  exports: [AuthUseCase],
})
export class AuthModule {}
