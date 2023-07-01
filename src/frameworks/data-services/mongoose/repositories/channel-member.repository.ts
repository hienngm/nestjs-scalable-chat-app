import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelMember } from '../schemas';
import { IChannelMemberRepository } from 'src/core/interfaces';
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
}
