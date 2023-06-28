import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserRepository } from 'src/core/interfaces';
import { User } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  async findByChannelId(channelId: string): Promise<User[]> {
    return this.userModel.find({});
  }
}
