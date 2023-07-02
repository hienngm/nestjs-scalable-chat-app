import { IChannelMember } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

interface IIsChannelMemberParams {
  userId: string;
  channelId: string;
}

const CHANNEL_MEMBER_REPOSITORY_TOKEN = Symbol(
  'CHANNEL_MEMBER_REPOSITORY_TOKEN',
);
interface IChannelMemberRepository extends IBaseRepository<IChannelMember> {
  isChannelMember(params: IIsChannelMemberParams): Promise<boolean>;
}

export {
  CHANNEL_MEMBER_REPOSITORY_TOKEN,
  IChannelMemberRepository,
  IIsChannelMemberParams,
};
