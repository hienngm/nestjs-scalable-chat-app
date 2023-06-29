import { IMessage } from 'src/core/entities';

interface ICreateMessageParams {
  channelId: string;
  content: string;
  senderId: string;
}

const MESSAGE_REPOSITORY_TOKEN = Symbol('MESSAGE_REPOSITORY_TOKEN');
interface IMessageRepository {
  createOne: (params: ICreateMessageParams) => Promise<IMessage>;
}

export { ICreateMessageParams, MESSAGE_REPOSITORY_TOKEN, IMessageRepository };
