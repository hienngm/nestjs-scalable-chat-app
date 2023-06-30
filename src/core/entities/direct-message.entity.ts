import { IUser, IWorkspace, IBaseEntity } from './';

export interface IDirectMessage extends IBaseEntity {
  content?: string;

  workspaceId?: string;

  workspace?: IWorkspace;

  receiverId?: string;

  receiver?: IUser;

  senderId?: string;

  sender?: IUser;
}
