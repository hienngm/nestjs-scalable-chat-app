import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}
