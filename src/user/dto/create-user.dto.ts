import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches, MaxLength, MinLength, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isAcitve: boolean = true;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}
