import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAllUsers(): Promise<Array<User>> {
        return await this.userModel.find().exec();
    }

    async getUser(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username}).exec();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await new this.userModel(createUserDto).save();
    }
}
