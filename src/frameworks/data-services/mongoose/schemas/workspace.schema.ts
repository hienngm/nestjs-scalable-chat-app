import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IWorkspace } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { Field, ObjectType } from '@nestjs/graphql';

export type WorkspaceDocument = mongoose.HydratedDocument<Workspace>;

export const WORKSPACE_COLLECTION = 'workspaces';
@Schema({ timestamps: true, collection: WORKSPACE_COLLECTION })
@ObjectType()
export class Workspace implements IWorkspace {
  @Prop()
  @Field()
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  @Field()
  owner?: User;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
