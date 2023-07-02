import { IDirectMessage, IMessage } from 'src/core/entities';

interface IPublishChannelMessageParams {
  channelId: string;
  message: IMessage;
}

interface IPublishDirectMessageParams {
  message: IDirectMessage;
}

const PUBSUB_SERVICE_TOKEN = Symbol('PUBSUB_SERVICE_TOKEN');
interface IPubSubService {
  publishChannelMessageEvent(
    params: IPublishChannelMessageParams,
  ): Promise<void>;

  publishDirectMessageEvent(params: IPublishDirectMessageParams): Promise<void>;
}

export {
  PUBSUB_SERVICE_TOKEN,
  IPublishChannelMessageParams,
  IPubSubService,
  IPublishDirectMessageParams,
};
