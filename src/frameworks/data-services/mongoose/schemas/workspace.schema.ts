import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IWorkspace } from 'src/core/entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseSchema, baseSchemaOptions } from './base.schema';

type WorkspaceDocument = mongoose.HydratedDocument<Workspace>;

const WORKSPACE_COLLECTION = 'workspaces';
@Schema({ ...baseSchemaOptions, collection: WORKSPACE_COLLECTION })
@ObjectType()
class Workspace extends BaseSchema implements IWorkspace {
  @Prop()
  @Field()
  name?: string;
}

const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

export { WorkspaceDocument, Workspace, WorkspaceSchema };
