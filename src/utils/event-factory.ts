import { EVENT_TYPES } from '../frameworks/pubsub-services/graphql-redis-subscriptions/constants/index';
import { Message } from 'src/frameworks/data-services/mongoose/schemas';

interface IBaseEvent {
  type: EVENT_TYPES;
  payload: Record<string, unknown>;
}

interface IRenewAuthDataEvent extends IBaseEvent {
  type: EVENT_TYPES.RENEW_AUTH_DATA;
  payload: {
    subscriberId: string;
  };
}

interface IChannelMessageEvent extends IBaseEvent {
  type: EVENT_TYPES.CHANNEL_MESSAGE;
  payload: {
    message: Message;
    channelId: string;
  };
}

export type IEvent = IRenewAuthDataEvent | IChannelMessageEvent;

export class EventFactory {
  static createRenewAuthDataEvent(
    payload: IRenewAuthDataEvent['payload'],
  ): IRenewAuthDataEvent {
    return {
      type: EVENT_TYPES.RENEW_AUTH_DATA,
      payload,
    };
  }

  static createChannelMessageEvent(
    payload: IChannelMessageEvent['payload'],
  ): IChannelMessageEvent {
    return {
      type: EVENT_TYPES.CHANNEL_MESSAGE,
      payload,
    };
  }
}
