import { IUser, IWorkspace } from './';

export interface IDirectMessage {
  content?: string;

  workspace?: IWorkspace;

  receiver?: IUser;

  sender?: IUser;
}
