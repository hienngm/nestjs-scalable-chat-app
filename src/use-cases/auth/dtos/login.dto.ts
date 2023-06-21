import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  username: string;

  @Field()
  password: string;
}
