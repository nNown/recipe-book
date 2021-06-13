import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type RecipeDocument = Recipe & mongoose.Document;

@Schema()
export class Recipe {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop([String])
    ingredients: string[];

    @Prop([String])
    preparation: string[];

    @Prop()
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    author: User;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);