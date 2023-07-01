import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DATA_SERVICE_TOKEN, IDataService } from 'src/core/interfaces';
import { LoginInput, LoginResponse } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/frameworks/data-services/mongoose/schemas';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private readonly dataService: IDataService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    const { username, password } = loginInput;
    const user = await this.dataService.users.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new BadRequestException('Invalid username or password');
    }

    const accessToken = await this.generateToken(user);

    return {
      accessToken,
      user,
    };
  }

  async generateToken(user: User): Promise<string> {
    const { id, username } = user;
    const accessToken = await this.jwtService.signAsync({
      sub: id,
      username: username,
    });

    return accessToken;
  }
}
