import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/recipes'),
    // MongooseModule.forRoot('mongodb://localhost:27017/recipes', {
    //   connectionName: 'recipes'
    // }),
    // MongooseModule.forRoot('mongodb://localhost:27017/recipes', {
    //   connectionName: 'users'
    // }),
    RecipesModule,
    AuthModule,
    UsersModule
  ],
  providers: [UsersService],
})
export class AppModule {}
