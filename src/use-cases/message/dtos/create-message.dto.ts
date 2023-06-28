import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsString()
  channelId: string;

  @Field()
  @IsString()
  content: string;
}
