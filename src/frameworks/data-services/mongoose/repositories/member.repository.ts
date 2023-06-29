import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMemberRepository } from 'src/core/interfaces';
import { Member } from '../schemas';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
  ) {}

  createOne(data: Member): Promise<Member> {
    return this.memberModel.create(data);
  }
}
