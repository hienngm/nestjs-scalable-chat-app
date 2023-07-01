import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IBaseEntity } from 'src/core/entities/base.entity';

// Always convert to string when getting an ObjectId
mongoose.Schema.Types.ObjectId.get((value) => {
  if (value) {
    return value.toString();
  }

  return value;
});

const baseSchemaOptions: SchemaOptions = {
  id: false,
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
};

@ObjectType()
class BaseSchema implements IBaseEntity {
  @Prop({
    virtual: true,
    get() {
      return this._id;
    },
    set(value) {
      if (value) {
        this.set({ _id: value });
      }
    },
  })
  @Field(() => String)
  id?: string;

  @Prop({ type: Date })
  @Field()
  createdAt?: Date;

  @Prop({ type: Date })
  @Field()
  updatedAt?: Date;
}

export { baseSchemaOptions, BaseSchema };
