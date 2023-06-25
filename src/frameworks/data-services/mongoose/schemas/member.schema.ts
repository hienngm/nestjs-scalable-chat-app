import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IMember, IUser } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { WORKSPACE_COLLECTION, Workspace } from './workspace.schema';

export type MemberDocument = mongoose.HydratedDocument<Member>;

export const MEMBER_COLLECTION = 'members';
@Schema({ timestamps: true, collection: MEMBER_COLLECTION })
export class Member implements IMember {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  workspace?: Workspace;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  user?: User;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
