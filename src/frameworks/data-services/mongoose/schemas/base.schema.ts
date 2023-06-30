import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { IBaseEntity } from 'src/core/entities/base.entity';

@ObjectType()
export class BaseSchema implements IBaseEntity {
  @Field(() => String)
  @Prop({ type: Schema.Types.ObjectId, alias: '_id' })
  id?: string;

  @Prop({ type: Date })
  @Field()
  createdAt?: Date;

  @Prop({ type: Date })
  @Field()
  updatedAt?: Date;
}
