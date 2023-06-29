import { Inject, Injectable } from '@nestjs/common';
import { IDataService } from 'src/core/interfaces';
import * as IRepositories from 'src/core/interfaces/repositories';

@Injectable()
export class MongooseDataService implements IDataService {
  constructor(
    @Inject(IRepositories.USER_REPOSITORY_TOKEN)
    public readonly users: IRepositories.IUserRepository,

    @Inject(IRepositories.MESSAGE_REPOSITORY_TOKEN)
    public readonly messages: IRepositories.IMessageRepository,

    @Inject(IRepositories.MEMBER_REPOSITORY_TOKEN)
    public readonly members: IRepositories.IMemberRepository,

    @Inject(IRepositories.CHANNEL_REPOSITORY_TOKEN)
    public readonly channels: IRepositories.IChannelRepository,

    @Inject(IRepositories.WORKSPACE_REPOSITORY_TOKEN)
    public readonly workspaces: IRepositories.IWorkspaceRepository,
  ) {}
}
