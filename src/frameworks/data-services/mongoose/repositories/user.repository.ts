import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import _ from 'lodash';

import { IUserRepository } from 'src/core/interfaces';
import { ChannelMember, User } from '../schemas';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(ChannelMember.name)
    private readonly channelMemberModel: Model<ChannelMember>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  async findByChannelId(channelId: string): Promise<User[]> {
    const channelMembers = await this.channelMemberModel.find({ channelId });
    return this.userModel.find({
      _id: { $in: _.map(channelMembers, 'userId') },
    });
  }

  createOne(data: User): Promise<User> {
    return this.userModel.create(data);
  }
}
