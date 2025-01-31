import { IsMongoId, IsNumberString, IsString } from "class-validator";

export class CreateTruckDto {

    @IsString()
    @IsMongoId()
    user: string; 

    @IsNumberString()
    year: string;

    @IsString()
    color: string;

    @IsString()
    plates: string;
}
