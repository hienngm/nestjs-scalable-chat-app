import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IDirectMessage, IWorkspace } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { WORKSPACE_COLLECTION } from './workspace.schema';
import { BaseSchema } from './base.schema';

export type DirectMessageDocument = mongoose.HydratedDocument<DirectMessage>;

export const DIRECT_MESSAGE_COLLECTION = 'directMessages';
@Schema({ timestamps: true, collection: DIRECT_MESSAGE_COLLECTION })
export class DirectMessage extends BaseSchema implements IDirectMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  workspace?: IWorkspace;

  @Prop()
  content?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  receiver?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  sender?: User;
}

export const DirectMessageSchema = SchemaFactory.createForClass(DirectMessage);
