import { IChannel, IUser } from './';

export interface IChannelMember {
  channel?: IChannel;

  user?: IUser;
}
