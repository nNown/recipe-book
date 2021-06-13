import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUser(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username}).exec();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, role } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new this.userModel({ username, password: hashedPassword, role });

        try {
            await user.save();
        } catch(error) {
            throw new InternalServerErrorException();
        }

        return user;
    }
}
