import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { IMessage } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { CHANNEL_COLLECTION, Channel } from './channel.schema';
import { WORKSPACE_COLLECTION, Workspace } from './workspace.schema';
import { BaseSchema } from './base.schema';

export type MessageDocument = mongoose.HydratedDocument<Message>;

export const MESSAGE_COLLECTION = 'messages';
@Schema({ timestamps: true, collection: MESSAGE_COLLECTION })
@ObjectType()
export class Message extends BaseSchema implements IMessage {
  @Prop()
  @Field()
  content?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  @Field()
  sender?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CHANNEL_COLLECTION })
  @Field()
  channel?: Channel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  @Field()
  workspace?: Workspace;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
