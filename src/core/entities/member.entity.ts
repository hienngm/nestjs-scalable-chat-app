import { IWorkspace, IUser, IBaseEntity } from './';

export interface IMember extends IBaseEntity {
  workspaceId?: string;

  workspace?: IWorkspace;

  userId?: string;

  user?: IUser;

  isAdmin?: boolean;
}
