import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IChannelMember } from 'src/core/entities';
import { User } from './user.schema';
import { Channel } from './channel.schema';
import { BaseSchema, baseSchemaOptions } from './base.schema';

type ChannelMemberDocument = mongoose.HydratedDocument<ChannelMember>;

const CHANNEL_MEMBER_COLLECTION = 'channelMembers';
@Schema({ ...baseSchemaOptions, collection: CHANNEL_MEMBER_COLLECTION })
class ChannelMember extends BaseSchema implements IChannelMember {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  channelId?: string;

  @Prop({})
  channel?: Channel;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId?: string;

  @Prop({})
  user?: User;
}

const ChannelMemberSchema = SchemaFactory.createForClass(ChannelMember);

export { ChannelMemberDocument, ChannelMember, ChannelMemberSchema };
