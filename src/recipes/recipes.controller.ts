/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipesService } from './recipes.service';
import { Recipe } from '../schemas/recipe.schema';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get()
    // @Roles(Role.Admin)
    async getAllRecipes(@Query() filterDto: GetRecipesFilterDto): Promise<Array<Recipe>> {
        return this.recipesService.getFilteredRecipes(filterDto);
        // if(Object.keys(filterDto).length) {
        //     return this.recipesService.getFilteredRecipes(filterDto);
        // } else {
        //     return await this.recipesService.getAllRecipes();
        // }
    }

    @Get('/:id')
    async getRecipeById(@Param('id') id: string): Promise<Recipe> {
        return await this.recipesService.getRecipeById(id);
    }

    @Post()
    async createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await this.recipesService.createRecipe(createRecipeDto);
    }

    @Delete('/:id')
    async deleteRecipeById(@Param('id') id: string): Promise<Recipe> {
        return await this.recipesService.deleteRecipeById(id);
    }

    @Put('/:id')
    async updateRecipeById(@Param('id') id: string, @Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await this.recipesService.updateRecipeById(id, createRecipeDto);
    }
}
