import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthUseCase } from 'src/use-cases/auth/auth.use-case';
import { LoginResponseDto, LoginInput } from 'src/use-cases/auth/dtos';

@Resolver()
export class AuthResolver {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Mutation(() => LoginResponseDto, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponseDto> {
    return this.authUseCase.login(loginInput);
  }
}
