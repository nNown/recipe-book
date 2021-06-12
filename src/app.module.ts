import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/recipe-book'),
    RecipesModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
