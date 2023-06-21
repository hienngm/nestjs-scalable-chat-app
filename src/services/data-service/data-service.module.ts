import { Module } from '@nestjs/common';
import { MongooseDataServiceModule } from 'src/frameworks/mongoose/mongoose-data-service.module';

@Module({
  imports: [MongooseDataServiceModule],
  exports: [MongooseDataServiceModule],
})
export class DataServiceModule {}
