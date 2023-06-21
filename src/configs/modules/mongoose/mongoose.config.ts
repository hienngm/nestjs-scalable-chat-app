import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { EnvConfigService } from 'src/configs/env/env.service';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return { uri: this.envConfigService.getMongoDBConnectionString() };
  }
}
