import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICreateMessageParams, IMessageRepository } from 'src/core/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}

  createOne(params: ICreateMessageParams): Promise<Message> {
    return this.messageModel.create(params);
  }
}
