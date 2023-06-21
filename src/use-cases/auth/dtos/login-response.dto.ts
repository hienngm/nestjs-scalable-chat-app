import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/frameworks/mongoose/schemas';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
