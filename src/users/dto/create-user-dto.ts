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
    // Passwords must contain at least 1 upper case letter
    // Passwords must contain at least 1 lower case letter
    // Passwords must contain at least 1 number or special character
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password is too weak" })
    password: string;

    @IsOptional()
    @IsString()
    @IsEnum(Role)
    role?: string;
}