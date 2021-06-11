import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @Get('/profile')
    getProfile() {
        return this.authService.getUsers();
    }

    @Public()
    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.signup(createUserDto);
    }
}
