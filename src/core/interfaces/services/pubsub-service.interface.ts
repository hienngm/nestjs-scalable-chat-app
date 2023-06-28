import { IMessage } from 'src/core/entities';

export interface IPublishChannelMessageParams {
  channelId: string;
  message: IMessage;
}

export const PUBSUB_SERVICE_TOKEN = Symbol('PUBSUB_SERVICE_TOKEN');
export interface IPubSubService {
  publishChannelMessage(params: IPublishChannelMessageParams): Promise<void>;
}
