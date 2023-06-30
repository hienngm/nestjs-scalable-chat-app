import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthUser } from 'src/common/interfaces';
import { EnvConfigService } from 'src/configs/env/env.service';
import { NODE_ENV } from 'src/constants';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy) {
  constructor(envConfigService: EnvConfigService) {
    const secretOrKey = envConfigService.getAccessJwtSecret();
    const env = envConfigService.getNodeEnv();
    super({
      ignoreExpiration: env === NODE_ENV.LOCAL,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  public validate(payload: any): IAuthUser {
    return {
      id: payload.sub,
      username: payload.username,
      exp: payload.exp,
    };
  }
}
