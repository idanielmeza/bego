import { ApiProperty } from "@nestjs/swagger";
import { Matches, MaxLength, MinLength, IsString } from "class-validator";

export class UpdateUserDto {

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
