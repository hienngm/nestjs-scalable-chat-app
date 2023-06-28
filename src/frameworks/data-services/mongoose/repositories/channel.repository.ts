import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from '../schemas';
import { IChannelRepository } from 'src/core/interfaces';
import { IMessage } from 'src/core/entities';

@Injectable()
export class ChannelRepository implements IChannelRepository {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<Channel>,
  ) {}

  async findOneById(id: string): Promise<IMessage | null> {
    return this.channelModel.findOne({ _id: id });
  }
}
