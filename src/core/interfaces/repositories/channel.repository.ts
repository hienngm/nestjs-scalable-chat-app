import { IMessage } from 'src/core/entities';

export const CHANNEL_REPOSITORY_TOKEN = Symbol('CHANNEL_REPOSITORY_TOKEN');
export interface IChannelRepository {
  findOneById: (id: string) => Promise<IMessage | null>;
}
