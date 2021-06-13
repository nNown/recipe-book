import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password is too weak" })
    password: string;

    @IsOptional()
    @IsString()
    @IsEnum(Role)
    role?: string;
}