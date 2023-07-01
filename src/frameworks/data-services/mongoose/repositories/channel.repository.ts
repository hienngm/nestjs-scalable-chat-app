import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from '../schemas';
import { IChannelRepository } from 'src/core/interfaces';
import { BaseRepository } from './base.repository';

@Injectable()
export class ChannelRepository
  extends BaseRepository<Channel>
  implements IChannelRepository
{
  constructor(
    @InjectModel(Channel.name)
    readonly channelModel: Model<Channel>,
  ) {
    super(channelModel);
  }
}
