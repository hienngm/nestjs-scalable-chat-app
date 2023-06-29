import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from '../schemas';
import { IChannelRepository } from 'src/core/interfaces';

@Injectable()
export class ChannelRepository implements IChannelRepository {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<Channel>,
  ) {}

  async findOneById(id: string): Promise<Channel | null> {
    return this.channelModel.findOne({ _id: id });
  }

  createOne(data: Channel): Promise<Channel> {
    return this.channelModel.create(data);
  }
}
