import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateLocationDto {
    
    @ApiProperty()
    @MinLength(1)
    address: string;

    @ApiProperty()
    @IsString()
    place_id: string;

    @ApiProperty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    longitude: number;
}
