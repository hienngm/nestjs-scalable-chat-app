import { IChannelMessageEvent } from './channel-message-event.interface';
import { IRenewAuthDataEvent } from './renew-auth-data.interface';
import { IDirectMessageEvent } from './direct-message-event.interface';

type IEvent = IChannelMessageEvent | IDirectMessageEvent;

type IAuthEvent = IRenewAuthDataEvent;

export { IEvent, IAuthEvent };
