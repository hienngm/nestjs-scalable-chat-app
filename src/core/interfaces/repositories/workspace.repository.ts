import { IWorkspace } from 'src/core/entities';

const WORKSPACE_REPOSITORY_TOKEN = Symbol('WORKSPACE_REPOSITORY_TOKEN');
interface IWorkspaceRepository {
  createOne(data: IWorkspace): Promise<IWorkspace>;
}

export { WORKSPACE_REPOSITORY_TOKEN, IWorkspaceRepository };
