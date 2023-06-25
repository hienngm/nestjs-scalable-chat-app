import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IMessage } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { CHANNEL_COLLECTION, Channel } from './channel.schema';
import { WORKSPACE_COLLECTION, Workspace } from './workspace.schema';

export type MessageDocument = mongoose.HydratedDocument<Message>;

export const MESSAGE_COLLECTION = 'messages';
@Schema({ timestamps: true, collection: MESSAGE_COLLECTION })
export class Message implements IMessage {
  @Prop()
  content?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  sender?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CHANNEL_COLLECTION })
  channel?: Channel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  workspace?: Workspace;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
