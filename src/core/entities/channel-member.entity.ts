import { IChannel, IUser, IBaseEntity } from './';

export interface IChannelMember extends IBaseEntity {
  channelId?: string;

  channel?: IChannel;

  userId?: string;

  user?: IUser;
}
