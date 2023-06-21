import { IUserRepository } from 'src/core/interfaces/repositories';

export const DATA_SERVICE_TOKEN = Symbol('DATA_SERVICE_TOKEN');
export interface IDataService {
  users: IUserRepository;
}
