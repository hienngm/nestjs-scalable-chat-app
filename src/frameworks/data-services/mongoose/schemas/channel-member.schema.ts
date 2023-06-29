import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IChannelMember } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { CHANNEL_COLLECTION, Channel } from './channel.schema';
import { BaseSchema } from './base.schema';

type ChannelMemberDocument = mongoose.HydratedDocument<ChannelMember>;

const CHANNEL_MEMBER_COLLECTION = 'channelMembers';
@Schema({ timestamps: true, collection: CHANNEL_MEMBER_COLLECTION })
class ChannelMember extends BaseSchema implements IChannelMember {
  @Prop()
  channelId?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CHANNEL_COLLECTION })
  channel?: Channel;

  @Prop()
  userId?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  user?: User;
}

const ChannelMemberSchema = SchemaFactory.createForClass(ChannelMember);

export {
  ChannelMemberDocument,
  CHANNEL_MEMBER_COLLECTION,
  ChannelMember,
  ChannelMemberSchema,
};
