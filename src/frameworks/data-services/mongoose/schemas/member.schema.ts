import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field } from '@nestjs/graphql';
import { IMember } from 'src/core/entities';
import { User } from './user.schema';
import { Workspace } from './workspace.schema';
import { BaseSchema } from './base.schema';

type MemberDocument = mongoose.HydratedDocument<Member>;

const MEMBER_COLLECTION = 'members';
@Schema({ timestamps: true, collection: MEMBER_COLLECTION })
class Member extends BaseSchema implements IMember {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  workspaceId?: string;

  @Prop({})
  @Field()
  workspace?: Workspace;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field()
  userId?: string;

  @Prop({})
  @Field()
  user?: User;

  @Prop({ type: Boolean })
  @Field()
  isAdmin?: boolean;
}

const MemberSchema = SchemaFactory.createForClass(Member);

export { MemberDocument, Member, MemberSchema };
