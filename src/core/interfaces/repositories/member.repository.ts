import { IMember } from 'src/core/entities';
import { IBaseRepository } from './base.repository';

const MEMBER_REPOSITORY_TOKEN = Symbol('MEMBER_REPOSITORY_TOKEN');
interface IMemberRepository extends IBaseRepository<IMember> {}

export { MEMBER_REPOSITORY_TOKEN, IMemberRepository };
