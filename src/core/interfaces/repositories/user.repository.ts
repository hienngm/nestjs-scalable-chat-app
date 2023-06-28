import { IUser } from 'src/core/entities';

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
export interface IUserRepository {
  findOneByUsername: (username: string) => Promise<IUser | null>;

  findByChannelId: (channelId: string) => Promise<IUser[]>;
}
