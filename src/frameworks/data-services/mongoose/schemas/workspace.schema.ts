import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IWorkspace } from 'src/core/entities';
import { USER_COLLECTION, User } from './user.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseSchema } from './base.schema';

type WorkspaceDocument = mongoose.HydratedDocument<Workspace>;

const WORKSPACE_COLLECTION = 'workspaces';
@Schema({ timestamps: true, collection: WORKSPACE_COLLECTION })
@ObjectType()
class Workspace extends BaseSchema implements IWorkspace {
  @Prop()
  @Field()
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  @Field()
  owner?: User;
}

const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

export { WorkspaceDocument, WORKSPACE_COLLECTION, Workspace, WorkspaceSchema };
