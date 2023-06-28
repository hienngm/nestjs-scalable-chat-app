import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Channel,
  ChannelSchema,
  Message,
  MessageSchema,
  User,
  UserSchema,
} from './schemas';
import { MongooseConfig } from 'src/configs/modules/mongoose/mongoose.config';
import { DATA_SERVICE_TOKEN } from 'src/core/interfaces';
import { MongooseDataService } from './mongoose-data-service.service';
import * as repositories from 'src/frameworks/data-services/mongoose/repositories';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  providers: [
    ...Object.values(repositories),
    MongooseDataService,
    {
      provide: DATA_SERVICE_TOKEN,
      useExisting: MongooseDataService,
    },
  ],
  exports: [DATA_SERVICE_TOKEN],
})
export class MongooseDataServiceModule {}
