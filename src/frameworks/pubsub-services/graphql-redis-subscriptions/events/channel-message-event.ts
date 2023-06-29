import { ObjectType, Field } from '@nestjs/graphql';
import { Message } from 'src/frameworks/data-services/mongoose/schemas';
import { EVENT_TYPES } from 'src/constants';
import {
  IChannelMessageEvent,
  IChannelMessagePayload,
} from 'src/core/interfaces/events';

@ObjectType()
class ChannelMessagePayload implements IChannelMessagePayload {
  @Field()
  message: Message;

  @Field()
  channelId: string;
}

@ObjectType()
class ChannelMessageEvent implements IChannelMessageEvent {
  @Field(() => EVENT_TYPES, {
    description: 'type: EventTypes.CHANNEL_MESSAGE',
  })
  type: EVENT_TYPES.CHANNEL_MESSAGE;

  @Field()
  payload: ChannelMessagePayload;
}

export { ChannelMessagePayload, ChannelMessageEvent };
