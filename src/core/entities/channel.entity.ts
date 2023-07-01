import { IWorkspace, IBaseEntity } from './';

export interface IChannel extends IBaseEntity {
  name?: string;

  workspaceId?: string;

  workspace?: IWorkspace;

  isPublic?: boolean;
}
