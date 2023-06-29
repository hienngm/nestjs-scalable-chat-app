import { EVENT_TYPES } from 'src/constants';
import { IBaseEvent } from './base-event.interface';
import { IMessage } from 'src/core/entities';

interface IChannelMessageEvent extends IBaseEvent {
  type: EVENT_TYPES.CHANNEL_MESSAGE;
  payload: IChannelMessagePayload;
}

interface IChannelMessagePayload {
  message: IMessage;
  channelId: string;
}

export { IChannelMessageEvent, IChannelMessagePayload };
