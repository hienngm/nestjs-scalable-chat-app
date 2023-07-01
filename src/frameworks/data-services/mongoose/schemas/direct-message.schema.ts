import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IDirectMessage } from 'src/core/entities';
import { User } from './user.schema';
import { Workspace } from './workspace.schema';
import { BaseSchema, baseSchemaOptions } from './base.schema';
import { Field } from '@nestjs/graphql';

type DirectMessageDocument = mongoose.HydratedDocument<DirectMessage>;

const DIRECT_MESSAGE_COLLECTION = 'directMessages';
@Schema({ ...baseSchemaOptions, collection: DIRECT_MESSAGE_COLLECTION })
class DirectMessage extends BaseSchema implements IDirectMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  workspaceId?: string;

  @Prop({})
  @Field()
  workspace?: Workspace;

  @Prop()
  @Field()
  content?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  receiverId?: string;

  @Prop({})
  @Field()
  receiver?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  senderId?: string;

  @Prop({})
  @Field()
  sender?: User;
}

const DirectMessageSchema = SchemaFactory.createForClass(DirectMessage);

export { DirectMessageDocument, DirectMessage, DirectMessageSchema };
