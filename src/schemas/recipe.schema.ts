import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop([String])
    ingredients: Array<string>;

    @Prop()
    preparation: string;

    @Prop()
    image: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    authorId: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);