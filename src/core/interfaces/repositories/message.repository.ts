import { IMessage } from 'src/core/entities';

export interface ICreateMessageParams {
  channelId: string;
  content: string;
  senderId: string;
}

export const MESSAGE_REPOSITORY_TOKEN = Symbol('MESSAGE_REPOSITORY_TOKEN');
export interface IMessageRepository {
  createOne: (params: ICreateMessageParams) => Promise<IMessage>;
}
