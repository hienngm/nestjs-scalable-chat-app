import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/core/entities';
import { BaseSchema } from './base.schema';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>;

export const USER_COLLECTION = 'users';
@Schema({ timestamps: true, collection: USER_COLLECTION })
@ObjectType()
export class User extends BaseSchema implements IUser {
  @Prop()
  @Field()
  username?: string;

  @Prop()
  @Field()
  email?: string;

  @Prop()
  @Field()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
