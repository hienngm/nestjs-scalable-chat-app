import { ObjectType, Field } from '@nestjs/graphql';
import { EVENT_TYPES } from 'src/constants';
import {
  IRenewAuthDataPayload,
  IRenewAuthDataEvent,
} from 'src/core/interfaces/events';

@ObjectType()
class RenewAuthDataPayload implements IRenewAuthDataPayload {
  @Field()
  subscriberId: string;
}

@ObjectType()
class RenewAuthDataEvent implements IRenewAuthDataEvent {
  @Field(() => EVENT_TYPES, {
    description: 'type: EventTypes.RENEW_AUTH_DATA',
  })
  type: EVENT_TYPES.RENEW_AUTH_DATA;

  @Field()
  payload: RenewAuthDataPayload;
}

export { RenewAuthDataPayload, RenewAuthDataEvent };
