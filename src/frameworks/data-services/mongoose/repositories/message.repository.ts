import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMessageRepository } from 'src/core/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas';
import { BaseRepository } from './base.repository';

@Injectable()
export class MessageRepository
  extends BaseRepository<Message>
  implements IMessageRepository
{
  constructor(
    @InjectModel(Message.name)
    readonly messageModel: Model<Message>,
  ) {
    super(messageModel);
  }
}
