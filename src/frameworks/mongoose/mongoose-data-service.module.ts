import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { MongooseConfig } from 'src/configs/modules/mongoose/mongoose.config';
import { DATA_SERVICE_TOKEN } from 'src/core/interfaces';
import { MongooseDataService } from './mongoose-data-service.service';
import * as repositories from 'src/frameworks/mongoose/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
  ],
  providers: [
    ...Object.values(repositories),
    {
      provide: DATA_SERVICE_TOKEN,
      useClass: MongooseDataService,
    },
  ],
  exports: [DATA_SERVICE_TOKEN],
})
export class MongooseDataServiceModule {}
