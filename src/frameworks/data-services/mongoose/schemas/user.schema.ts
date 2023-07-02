import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/core/entities';
import { BaseSchema, baseSchemaOptions } from './base.schema';
import { Field, ObjectType } from '@nestjs/graphql';

type UserDocument = HydratedDocument<User>;

const USER_COLLECTION = 'users';
@Schema({ ...baseSchemaOptions, collection: USER_COLLECTION })
@ObjectType()
class User extends BaseSchema implements IUser {
  @Prop()
  @Field()
  username?: string;

  @Prop()
  @Field()
  email?: string;

  @Prop()
  password?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserDocument, User, UserSchema };
