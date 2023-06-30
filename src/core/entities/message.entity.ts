import { IUser, IChannel, IBaseEntity } from './';

export interface IMessage extends IBaseEntity {
  content?: string;

  senderId?: string;

  sender?: IUser;

  channelId?: string;

  channel?: IChannel;
}
