import { IWorkspace, IUser } from './';

export interface IMember {
  workspace?: IWorkspace;

  user?: IUser;

  isAdmin?: boolean;
}
