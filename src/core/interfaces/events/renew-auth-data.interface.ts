import { EVENT_TYPES } from 'src/constants';
import { IBaseEvent } from './base-event.interface';

interface IRenewAuthDataEvent extends IBaseEvent {
  type: EVENT_TYPES.RENEW_AUTH_DATA;
  payload: IRenewAuthDataPayload;
}

interface IRenewAuthDataPayload {
  subscriberId: string;
}

export { IRenewAuthDataEvent, IRenewAuthDataPayload };
