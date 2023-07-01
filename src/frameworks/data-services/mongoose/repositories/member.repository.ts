import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMemberRepository } from 'src/core/interfaces';
import { Member } from '../schemas';
import { BaseRepository } from './base.repository';

@Injectable()
export class MemberRepository
  extends BaseRepository<Member>
  implements IMemberRepository
{
  constructor(
    @InjectModel(Member.name)
    readonly memberModel: Model<Member>,
  ) {
    super(memberModel);
  }
}
