import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '../../env/env.service';

@Injectable()
export class AccessJwtConfig implements JwtOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const jwtSecret = this.envConfigService.getAccessJwtSecret();
    const expirationTime = this.envConfigService.getAccessJwtExpirationTime();
    return {
      secret: jwtSecret,
      signOptions: { expiresIn: expirationTime },
    };
  }
}
