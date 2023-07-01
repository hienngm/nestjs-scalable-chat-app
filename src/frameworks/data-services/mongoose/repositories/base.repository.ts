import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBaseRepository } from 'src/core/interfaces/repositories/base.repository';

@Injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async createOne(data: T): Promise<T> {
    return this.model.create(data);
  }

  async updateById(id: string, data: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data);
  }
}
