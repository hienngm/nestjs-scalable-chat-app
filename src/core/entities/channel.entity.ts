import { IWorkspace } from '.';

export interface IChannel {
  name?: string;

  workspace?: IWorkspace;

  isPublic?: boolean;
}
