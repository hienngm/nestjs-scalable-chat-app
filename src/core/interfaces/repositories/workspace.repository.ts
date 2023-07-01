import { IWorkspace } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

const WORKSPACE_REPOSITORY_TOKEN = Symbol('WORKSPACE_REPOSITORY_TOKEN');
interface IWorkspaceRepository extends IBaseRepository<IWorkspace> {}

export { WORKSPACE_REPOSITORY_TOKEN, IWorkspaceRepository };
