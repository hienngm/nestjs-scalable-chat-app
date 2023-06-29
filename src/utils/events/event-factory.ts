import { EVENT_TYPES } from 'src/constants';
import {
  IChannelMessageEvent,
  IChannelMessagePayload,
  IRenewAuthDataEvent,
  IRenewAuthDataPayload,
} from 'src/core/interfaces/events';

export class EventFactory {
  static createRenewAuthDataEvent(
    payload: IRenewAuthDataPayload,
  ): IRenewAuthDataEvent {
    return {
      type: EVENT_TYPES.RENEW_AUTH_DATA,
      payload,
    };
  }

  static createChannelMessageEvent(
    payload: IChannelMessagePayload,
  ): IChannelMessageEvent {
    return {
      type: EVENT_TYPES.CHANNEL_MESSAGE,
      payload,
    };
  }
}
