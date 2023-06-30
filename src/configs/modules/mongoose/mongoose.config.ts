import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { EnvConfigService } from 'src/configs/env/env.service';
import { Schema } from 'mongoose';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return { uri: this.envConfigService.getMongoDBConnectionString() };
  }
}

// Mongoose config
Schema.Types.ObjectId.get((v) => v.toString());
