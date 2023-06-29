import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IMember } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { WORKSPACE_COLLECTION, Workspace } from './workspace.schema';
import { BaseSchema } from './base.schema';

type MemberDocument = mongoose.HydratedDocument<Member>;

const MEMBER_COLLECTION = 'members';
@Schema({ timestamps: true, collection: MEMBER_COLLECTION })
class Member extends BaseSchema implements IMember {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  workspace?: Workspace;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  user?: User;

  @Prop({ type: Boolean })
  isAdmin?: boolean;
}

const MemberSchema = SchemaFactory.createForClass(Member);

export { MemberDocument, MEMBER_COLLECTION, Member, MemberSchema };
