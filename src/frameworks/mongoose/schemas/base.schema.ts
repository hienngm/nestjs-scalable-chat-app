import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
export class BaseSchema {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId | string;

  @Prop({ type: Date })
  @Field()
  createdAt?: Date;

  @Prop({ type: Date })
  @Field()
  updatedAt?: Date;
}
