import { IMember } from 'src/core/entities';

const MEMBER_REPOSITORY_TOKEN = Symbol('MEMBER_REPOSITORY_TOKEN');
interface IMemberRepository {
  createOne(data: IMember): Promise<IMember>;
}

export { MEMBER_REPOSITORY_TOKEN, IMemberRepository };
