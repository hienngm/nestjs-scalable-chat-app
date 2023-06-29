import { IMessage } from 'src/core/entities';

interface IPublishChannelMessageParams {
  channelId: string;
  message: IMessage;
}

const PUBSUB_SERVICE_TOKEN = Symbol('PUBSUB_SERVICE_TOKEN');
interface IPubSubService {
  publishChannelMessage(params: IPublishChannelMessageParams): Promise<void>;
}

export { IPublishChannelMessageParams, PUBSUB_SERVICE_TOKEN, IPubSubService };
