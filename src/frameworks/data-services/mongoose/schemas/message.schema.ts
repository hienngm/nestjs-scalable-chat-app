import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { IMessage } from 'src/core/entities';
import { User } from './user.schema';
import { Channel } from './channel.schema';
import { BaseSchema, baseSchemaOptions } from './base.schema';

type MessageDocument = mongoose.HydratedDocument<Message>;

const MESSAGE_COLLECTION = 'messages';
@Schema({ ...baseSchemaOptions, collection: MESSAGE_COLLECTION })
@ObjectType()
class Message extends BaseSchema implements IMessage {
  @Prop()
  @Field()
  content?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  senderId?: string;

  @Prop({})
  @Field()
  sender?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String)
  channelId?: string;

  @Prop({})
  @Field()
  channel?: Channel;
}

const MessageSchema = SchemaFactory.createForClass(Message);

export { MessageDocument, Message, MessageSchema };
