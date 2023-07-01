import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import _ from 'lodash';

import { IUserRepository } from 'src/core/interfaces';
import { ChannelMember, User } from '../schemas';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(ChannelMember.name)
    private readonly channelMemberModel: Model<ChannelMember>,
  ) {
    super(userModel);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  async findByChannelId(channelId: string): Promise<User[]> {
    const channelMembers = await this.channelMemberModel.find({ channelId });
    return this.userModel.find({
      id: { $in: _.map(channelMembers, 'userId') },
    });
  }
}
