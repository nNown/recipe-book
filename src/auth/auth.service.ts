import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload-interface';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersService.getUser(username);

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            
            return { accessToken };
        } else {
            throw new UnauthorizedException('User credentials are incorrect');
        }
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return await this.usersService.createUser(authCredentialsDto);
    }

    async getUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }
}
