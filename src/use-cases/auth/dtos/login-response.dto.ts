import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/frameworks/data-services/mongoose/schemas';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
