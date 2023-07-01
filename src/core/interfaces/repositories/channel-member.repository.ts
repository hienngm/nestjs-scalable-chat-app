import { IChannelMember } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

const CHANNEL_MEMBER_REPOSITORY_TOKEN = Symbol(
  'CHANNEL_MEMBER_REPOSITORY_TOKEN',
);
interface IChannelMemberRepository extends IBaseRepository<IChannelMember> {}

export { CHANNEL_MEMBER_REPOSITORY_TOKEN, IChannelMemberRepository };
