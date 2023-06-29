import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/frameworks/data-services/mongoose/schemas';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
