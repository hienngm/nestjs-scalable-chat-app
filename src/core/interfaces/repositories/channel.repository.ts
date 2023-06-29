import { IChannel } from 'src/core/entities';

const CHANNEL_REPOSITORY_TOKEN = Symbol('CHANNEL_REPOSITORY_TOKEN');
interface IChannelRepository {
  findOneById: (id: string) => Promise<IChannel | null>;

  createOne(data: IChannel): Promise<IChannel>;
}

export { CHANNEL_REPOSITORY_TOKEN, IChannelRepository };
