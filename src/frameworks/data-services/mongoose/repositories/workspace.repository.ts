import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IWorkspaceRepository } from 'src/core/interfaces';
import { Workspace } from '../schemas';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<Workspace>,
  ) {}

  createOne(data: Workspace): Promise<Workspace> {
    return this.workspaceModel.create(data);
  }
}
