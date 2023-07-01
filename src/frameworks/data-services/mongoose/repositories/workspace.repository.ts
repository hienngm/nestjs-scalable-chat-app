import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IWorkspaceRepository } from 'src/core/interfaces';
import { Workspace } from '../schemas';
import { BaseRepository } from './base.repository';

@Injectable()
export class WorkspaceRepository
  extends BaseRepository<Workspace>
  implements IWorkspaceRepository
{
  constructor(
    @InjectModel(Workspace.name)
    readonly workspaceModel: Model<Workspace>,
  ) {
    super(workspaceModel);
  }
}
