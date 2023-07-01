import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { IChannel } from 'src/core/entities';
import { Workspace } from './workspace.schema';
import { BaseSchema, baseSchemaOptions } from './base.schema';

type ChannelDocument = mongoose.HydratedDocument<Channel>;

const CHANNEL_COLLECTION = 'channels';
@Schema({ ...baseSchemaOptions, collection: CHANNEL_COLLECTION })
@ObjectType()
class Channel extends BaseSchema implements IChannel {
  @Prop()
  @Field()
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  workspaceId?: string;

  @Prop({})
  @Field()
  workspace?: Workspace;

  @Prop()
  @Field()
  isPublic?: boolean;
}

const ChannelSchema = SchemaFactory.createForClass(Channel);

export { ChannelDocument, Channel, ChannelSchema };
