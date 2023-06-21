import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/core/interfaces';
import * as repositories from 'src/frameworks/mongoose/repositories';

@Injectable()
export class MongooseDataService implements IDataService {
  constructor(public readonly users: repositories.UserRepository) {}
}
