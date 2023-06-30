import { IBaseEntity } from './';

export interface IUser extends IBaseEntity {
  username?: string;

  email?: string;

  password?: string;
}
