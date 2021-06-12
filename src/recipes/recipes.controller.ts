/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipesService } from './recipes.service';
import { Recipe } from '../schemas/recipe.schema';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('recipes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get()
    @Roles(Role.Admin)
    async getAllRecipes() {
        return this.recipesService.getAllRecipes();
    }

    @Get('/profile')
    async getFilteredRecipes(@Query() filterDto: GetRecipesFilterDto, @GetUser() user: User): Promise<Array<Recipe>> {
        return this.recipesService.getFilteredRecipes(filterDto, user);
    }

    @Get('/:id')
    async getRecipeById(@Param('id') id: string, @GetUser() user: User): Promise<Recipe> {
        return await this.recipesService.getRecipeById(id, user);
    }

    @Post()
    async createRecipe(@Body() createRecipeDto: CreateRecipeDto, @GetUser() user: User): Promise<Recipe> {
        return await this.recipesService.createRecipe(createRecipeDto, user);
    }

    @Delete('/:id')
    async deleteRecipeById(@Param('id') id: string, @GetUser() user: User): Promise<Recipe> {
        return await this.recipesService.deleteRecipeById(id, user);
    }

    @Put('/:id')
    async updateRecipeById(@Param('id') id: string, @GetUser() user: User, @Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await this.recipesService.updateRecipeById(id, user, createRecipeDto);
    }
}
