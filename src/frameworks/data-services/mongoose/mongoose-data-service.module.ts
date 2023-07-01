import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as schemas from './schemas';
import { MongooseConfig } from 'src/configs/modules/mongoose/mongoose.config';
import * as IRepositories from 'src/core/interfaces/repositories';
import { MongooseDataService } from './mongoose-data-service.service';
import * as repositories from 'src/frameworks/data-services/mongoose/repositories';
import { DATA_SERVICE_TOKEN } from 'src/core/interfaces';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    MongooseModule.forFeature([
      { name: schemas.User.name, schema: schemas.UserSchema },
      { name: schemas.Message.name, schema: schemas.MessageSchema },
      { name: schemas.Member.name, schema: schemas.MemberSchema },
      { name: schemas.Channel.name, schema: schemas.ChannelSchema },
      { name: schemas.ChannelMember.name, schema: schemas.ChannelMemberSchema },
      { name: schemas.Workspace.name, schema: schemas.WorkspaceSchema },
    ]),
  ],
  providers: [
    ...Object.values(repositories),
    MongooseDataService,
    {
      provide: DATA_SERVICE_TOKEN,
      useExisting: MongooseDataService,
    },
    {
      provide: IRepositories.USER_REPOSITORY_TOKEN,
      useExisting: repositories.UserRepository,
    },
    {
      provide: IRepositories.MEMBER_REPOSITORY_TOKEN,
      useExisting: repositories.MemberRepository,
    },
    {
      provide: IRepositories.CHANNEL_REPOSITORY_TOKEN,
      useExisting: repositories.ChannelRepository,
    },
    {
      provide: IRepositories.MESSAGE_REPOSITORY_TOKEN,
      useExisting: repositories.MessageRepository,
    },
    {
      provide: IRepositories.WORKSPACE_REPOSITORY_TOKEN,
      useExisting: repositories.WorkspaceRepository,
    },
    {
      provide: IRepositories.CHANNEL_MEMBER_REPOSITORY_TOKEN,
      useExisting: repositories.ChannelMemberRepository,
    },
  ],
  exports: [DATA_SERVICE_TOKEN],
})
export class MongooseDataServiceModule {}
