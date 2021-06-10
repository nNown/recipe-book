import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    ingredients: Array<string>;
    
    @IsNotEmpty()
    preparation: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    authorId: string;
}