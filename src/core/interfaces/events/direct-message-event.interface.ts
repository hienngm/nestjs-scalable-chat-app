import { EVENT_TYPES } from 'src/constants';
import { IBaseEvent } from './base-event.interface';
import { IDirectMessage } from 'src/core/entities';

interface IDirectMessageEvent extends IBaseEvent {
  type: EVENT_TYPES.DIRECT_MESSAGE;
  payload: IDirectMessagePayload;
}

interface IDirectMessagePayload {
  message: IDirectMessage;
}

export { IDirectMessageEvent, IDirectMessagePayload };
