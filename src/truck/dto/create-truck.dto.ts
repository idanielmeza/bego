import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumberString, IsString } from "class-validator";

export class CreateTruckDto {

    @ApiProperty()
    @IsString()
    @IsMongoId()
    user: string; 

    @ApiProperty()
    @IsNumberString()
    year: string;

    @ApiProperty()
    @IsString()
    color: string;

    @ApiProperty()
    @IsString()
    plates: string;
}
