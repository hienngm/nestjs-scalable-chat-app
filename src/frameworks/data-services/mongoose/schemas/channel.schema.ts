import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { IChannel } from 'src/core/entities';
import { WORKSPACE_COLLECTION, Workspace } from './workspace.schema';
import { BaseSchema } from './base.schema';

export type ChannelDocument = mongoose.HydratedDocument<Channel>;

export const CHANNEL_COLLECTION = 'channels';
@Schema({ timestamps: true, collection: CHANNEL_COLLECTION })
@ObjectType()
export class Channel extends BaseSchema implements IChannel {
  @Prop()
  @Field()
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  @Field()
  workspace?: Workspace;

  @Prop()
  @Field()
  isPublic?: boolean;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
