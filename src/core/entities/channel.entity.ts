import { IWorkspace, IBaseEntity } from './';

export interface IChannel extends IBaseEntity {
  name?: string;

  workplaceId?: string;

  workspace?: IWorkspace;

  isPublic?: boolean;
}
