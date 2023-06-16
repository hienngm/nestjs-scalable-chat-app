import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IChannel, IWorkspace } from 'src/core/entities';
import { WORKSPACE_COLLECTION } from './workspace.schema';

export type ChannelDocument = mongoose.HydratedDocument<Channel>;

export const CHANNEL_COLLECTION = 'channels';
@Schema({ timestamps: true, collection: CHANNEL_COLLECTION })
export class Channel implements IChannel {
  @Prop()
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WORKSPACE_COLLECTION })
  workspace?: IWorkspace;

  @Prop()
  isPublic?: boolean;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
