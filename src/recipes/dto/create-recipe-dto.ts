import { IsNotEmpty } from 'class-validator';
import { User } from 'src/schemas/user.schema';

export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    ingredients: string[];
    
    @IsNotEmpty()
    preparation: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    author: User;
}