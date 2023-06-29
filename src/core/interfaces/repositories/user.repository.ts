import { IUser } from 'src/core/entities';

const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
interface IUserRepository {
  findOneByUsername: (username: string) => Promise<IUser | null>;

  findByChannelId: (channelId: string) => Promise<IUser[]>;

  createOne(data: IUser): Promise<IUser>;
}

export { USER_REPOSITORY_TOKEN, IUserRepository };
