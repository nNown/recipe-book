import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateRecipeDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsNotEmpty()
    ingredients: string[];
    
    @IsNotEmpty()
    preparation: string[];

    @IsNotEmpty()
    @IsString()
    @Matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, { message: "Image is not url" })
    image: string;
}