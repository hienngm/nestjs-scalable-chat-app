import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  DATA_SERVICE_TOKEN,
  IDataService,
  IPubSubService,
  PUBSUB_SERVICE_TOKEN,
} from 'src/core/interfaces';
import { Message } from 'src/frameworks/data-services/mongoose/schemas';
import { CreateChannelMessageInput } from './dtos/create-message.dto';

@Injectable()
export class MessageUseCase {
  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private readonly dataService: IDataService,
    @Inject(PUBSUB_SERVICE_TOKEN)
    private readonly pubSubService: IPubSubService,
  ) {}

  async createOne(params: {
    senderId: string;
    createMessageInput: CreateChannelMessageInput;
  }): Promise<Message> {
    const { senderId, createMessageInput } = params;
    const { channelId } = createMessageInput;

    const isChannelMember =
      await this.dataService.channelMembers.isChannelMember({
        userId: senderId,
        channelId,
      });

    if (!isChannelMember) {
      throw new BadRequestException('Channel is not valid');
    }

    const message = await this.dataService.messages.createOne({
      senderId,
      ...createMessageInput,
    });

    this.pubSubService
      .publishChannelMessageEvent({
        channelId: createMessageInput.channelId,
        message,
      })
      // TODO: Implement proper error handling and notification mechanism
      .catch((e) => console.log(e));

    return message;
  }
}
