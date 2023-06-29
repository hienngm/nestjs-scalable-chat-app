import { IChannelMessageEvent } from './channel-message-event.interface';
import { IRenewAuthDataEvent } from './renew-auth-data.interface';

export type IEvent = IChannelMessageEvent | IRenewAuthDataEvent;
