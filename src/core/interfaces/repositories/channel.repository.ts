import { IChannel } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

const CHANNEL_REPOSITORY_TOKEN = Symbol('CHANNEL_REPOSITORY_TOKEN');
interface IChannelRepository extends IBaseRepository<IChannel> {}

export { CHANNEL_REPOSITORY_TOKEN, IChannelRepository };
