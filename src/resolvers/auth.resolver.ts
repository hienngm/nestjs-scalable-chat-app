import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { AuthUseCase } from 'src/use-cases/auth/auth.user-case';
import { LoginResponseDto, LoginDto } from 'src/use-cases/auth/dtos';

@Resolver()
export class AuthResolver {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Query(() => String, { name: 'ping' })
  async ping() {
    return 'pong';
  }

  @Mutation(() => LoginResponseDto, { name: 'login' })
  async login(@Args('loginDto') loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authUseCase.login(loginDto);
  }
}
