import * as IRepositories from 'src/core/interfaces/repositories';

export const DATA_SERVICE_TOKEN = Symbol('DATA_SERVICE_TOKEN');
export interface IDataService {
  users: IRepositories.IUserRepository;

  messages: IRepositories.IMessageRepository;

  channels: IRepositories.IChannelRepository;

  workspaces: IRepositories.IWorkspaceRepository;

  members: IRepositories.IMemberRepository;
}
