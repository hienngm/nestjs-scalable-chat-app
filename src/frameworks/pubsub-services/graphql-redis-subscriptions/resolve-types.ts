import { createUnionType, registerEnumType } from '@nestjs/graphql';
import { EVENT_TYPES } from 'src/constants';
import { RenewAuthDataEvent, ChannelMessageEvent } from './events';

registerEnumType(EVENT_TYPES, {
  name: 'EventTypes',
});

const EventUnion = createUnionType({
  name: 'Event',
  types: () => [RenewAuthDataEvent, ChannelMessageEvent] as const,
});

export { EventUnion };
