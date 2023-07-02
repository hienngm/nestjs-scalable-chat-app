import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelMember } from '../schemas';
import {
  IChannelMemberRepository,
  IIsChannelMemberParams,
} from 'src/core/interfaces';
import { BaseRepository } from './base.repository';

@Injectable()
export class ChannelMemberRepository
  extends BaseRepository<ChannelMember>
  implements IChannelMemberRepository
{
  constructor(
    @InjectModel(ChannelMember.name)
    readonly channelMemberModel: Model<ChannelMember>,
  ) {
    super(channelMemberModel);
  }

  async isChannelMember(params: IIsChannelMemberParams): Promise<boolean> {
    const { userId, channelId } = params;

    const channelMember = await this.channelMemberModel.findOne({
      userId,
      channelId,
    });

    if (!channelMember) {
      return false;
    }

    return true;
  }
}
