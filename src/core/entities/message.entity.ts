import { IUser, IChannel } from './';

export interface IMessage {
  content?: string;

  sender?: IUser;

  channel?: IChannel;
}
