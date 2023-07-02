import { createUnionType, registerEnumType } from '@nestjs/graphql';
import { EVENT_TYPES } from 'src/constants';
import { IEvent } from 'src/core/interfaces/events';
import { ChannelMessageEvent, DirectMessageEvent } from './events';

registerEnumType(EVENT_TYPES, {
  name: 'EventTypes',
});

const EventUnion = createUnionType({
  name: 'Event',
  types: () => [DirectMessageEvent, ChannelMessageEvent] as const,
  resolveType(event: IEvent) {
    switch (event.type) {
      case EVENT_TYPES.DIRECT_MESSAGE:
        return DirectMessageEvent;

      case EVENT_TYPES.CHANNEL_MESSAGE:
        return ChannelMessageEvent;

      default:
        return null;
    }
  },
});

export { EventUnion };
