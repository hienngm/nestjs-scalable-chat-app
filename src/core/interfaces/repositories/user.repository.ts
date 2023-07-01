import { IUser } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
interface IUserRepository extends IBaseRepository<IUser> {
  findOneByUsername: (username: string) => Promise<IUser | null>;

  findByChannelId: (channelId: string) => Promise<IUser[]>;
}

export { USER_REPOSITORY_TOKEN, IUserRepository };
