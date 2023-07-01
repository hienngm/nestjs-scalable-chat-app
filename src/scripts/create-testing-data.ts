import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { DATA_SERVICE_TOKEN, IDataService } from 'src/core/interfaces';

async function createTestingData() {
  try {
    console.log('Start creating testing data...');
    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    });

    const dataService: IDataService = app.get(DATA_SERVICE_TOKEN);

    const createUser = async (username, email) => {
      const password = await bcrypt.hash('12345678', 10);
      const user = await dataService.users.createOne({
        username,
        email,
        password,
      });
      return user;
    };

    const createWorkspace = async (name) => {
      const workspace = await dataService.workspaces.createOne({ name });
      return workspace;
    };

    const createMember = async (userId, workspaceId) => {
      await dataService.members.createOne({ userId, workspaceId });
    };

    const createChannel = async (name, workspaceId) => {
      const channel = await dataService.channels.createOne({
        name,
        workspaceId,
      });
      return channel;
    };

    const createChannelMember = async (channelId, userId) => {
      await dataService.channelMembers.createOne({ channelId, userId });
    };

    const user1 = await createUser('user1', 'user1@test.com');
    const user2 = await createUser('user2', 'user2@test.com');
    const user3 = await createUser('user3', 'user3@test.com');

    const workspace = await createWorkspace('workspace1');

    await createMember(user1.id, workspace.id);
    await createMember(user2.id, workspace.id);
    await createMember(user3.id, workspace.id);

    const channel = await createChannel('channel1', workspace.id);

    await createChannelMember(channel.id, user1.id);
    await createChannelMember(channel.id, user2.id);
    await createChannelMember(channel.id, user3.id);

    console.log('Finish creating testing data.');
    await app.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}

createTestingData()
  .then(() => console.log('Done tes'))
  .catch((e) => console.log(e));
