import { EVENT_TYPES } from 'src/constants';

export interface IBaseEvent {
  type: EVENT_TYPES;
  payload: unknown;
}
