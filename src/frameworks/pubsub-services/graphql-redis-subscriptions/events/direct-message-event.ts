import { ObjectType, Field } from '@nestjs/graphql';
import { DirectMessage } from 'src/frameworks/data-services/mongoose/schemas';
import { EVENT_TYPES } from 'src/constants';
import {
  IDirectMessageEvent,
  IDirectMessagePayload,
} from 'src/core/interfaces/events';

@ObjectType()
class DirectMessagePayload implements IDirectMessagePayload {
  @Field()
  message: DirectMessage;
}

@ObjectType()
class DirectMessageEvent implements IDirectMessageEvent {
  @Field(() => EVENT_TYPES, {
    description: 'type: EventTypes.DIRECT_MESSAGE',
  })
  type: EVENT_TYPES.DIRECT_MESSAGE;

  @Field()
  payload: DirectMessagePayload;
}

export { DirectMessagePayload, DirectMessageEvent };
