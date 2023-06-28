import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthUser } from 'src/common/interfaces';
import { Message } from 'src/frameworks/data-services/mongoose/schemas';
import { CreateMessageInput } from 'src/use-cases/message/dtos/create-message.dto';
import { MessageUseCase } from 'src/use-cases/message/message.use-case';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageUseCase: MessageUseCase) {}

  @Mutation(() => Message, { name: 'createMessage' })
  async createOne(
    @CurrentUser() user: IAuthUser,
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    return this.messageUseCase.createOne({
      senderId: user.sub,
      createMessageInput,
    });
  }
}
