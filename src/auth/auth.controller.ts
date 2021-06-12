import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { GetUser } from './get-user-decorator';
import { JwtAuthGuard } from './jwt-auth-guard';
import { Public } from './public.decorator';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/users')
    @Roles(Role.Admin)
    async getUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

    @Post('/signin')
    @Public()
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/signup')
    @Public()
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }
}
