import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/core/entities';

export type UserDocument = HydratedDocument<User>;

export const USER_COLLECTION = 'users';
@Schema({ timestamps: true, collection: USER_COLLECTION })
export class User implements IUser {
  @Prop()
  username?: string;

  @Prop()
  email?: string;

  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
