import { IMessage } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

const MESSAGE_REPOSITORY_TOKEN = Symbol('MESSAGE_REPOSITORY_TOKEN');
interface IMessageRepository extends IBaseRepository<IMessage> {}

export { MESSAGE_REPOSITORY_TOKEN, IMessageRepository };
