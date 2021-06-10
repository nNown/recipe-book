import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument, RecipeSchema } from '../schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';

@Injectable()
export class RecipesService {
    constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

    // async getAllRecipes(): Promise<Array<Recipe>> {
    //     return await this.recipeModel.find().exec();
    // }

    async getFilteredRecipes(filterDto: GetRecipesFilterDto): Promise<Array<Recipe>> {
        const { keyword } = filterDto;

        let recipes = await this.recipeModel.find().exec();

        if(keyword) {
            recipes = recipes.filter(recipe => {
                if(recipe.title.toLowerCase().includes(keyword) || recipe.description.toLowerCase().includes(keyword)) {
                    return true;
                }
                return false;
            });
        }

        return recipes;
    }

    async getRecipeById(id: string): Promise<Recipe> {
        return await this.recipeModel.findById(id).exec();
    }

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await new this.recipeModel(createRecipeDto).save();
    }

    async deleteRecipeById(id: string): Promise<Recipe> {
        return await this.recipeModel.findByIdAndDelete(id).exec();
    }

    async updateRecipeById(id: string, createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await this.recipeModel.findByIdAndUpdate(id, createRecipeDto).exec();
    }

    // getFilteredRecipes(filterDto: GetRecipesFilterDto): Array<Recipe> {
    //     const { keyword } = filterDto;

    //     let recipes = this.getRecipes();

    //     if(keyword) {
    //         recipes = recipes.filter(recipe => {
    //             if(recipe.title.toLowerCase().includes(keyword) || recipe.description.toLowerCase().includes(keyword)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }

    //     return recipes;
    // }
}
