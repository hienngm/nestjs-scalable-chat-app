import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUseCase } from './auth.user-case';
import { DataServiceModule } from 'src/services/data-service/data-service.module';

@Module({
  imports: [JwtModule, DataServiceModule],
  providers: [AuthUseCase],
  exports: [AuthUseCase],
})
export class AuthModule {}
