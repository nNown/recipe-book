import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument, RecipeSchema } from '../schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class RecipesService {
    constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

    async getAllRecipes(filterDto: GetRecipesFilterDto): Promise<Recipe[]> {
        const{ page, limit } = filterDto;
        return await this.recipeModel.find().skip(page * limit).limit(limit).exec();
    }

    async getFilteredRecipes(filterDto: GetRecipesFilterDto, user: User): Promise<Recipe[]> {
        const { title, page, limit } = filterDto;

        let recipes = await this.recipeModel.find({ author: user }).skip(page * limit).limit(limit).exec();

        if(title) {
            recipes = recipes.filter(recipe => {
                if(recipe.title.toLowerCase().includes(title)) {
                    return true;
                }
                return false;
            });
        }

        return recipes;
    }

    async getRecipeById(id: string, user: User): Promise<Recipe> {
        return await this.recipeModel.findOne({ _id: id, author: user }).exec();
    }

    async createRecipe(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
        return await new this.recipeModel({ ...createRecipeDto, author: user }).save();
    }

    async deleteRecipeById(id: string, user: User): Promise<Recipe> {
        return await this.recipeModel.findOneAndRemove({ _id: id, author: user });
    }

    async updateRecipeById(id: string, user: User, createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await this.recipeModel.findOneAndUpdate({ _id: id, author: user }, createRecipeDto).exec();
    }
}
