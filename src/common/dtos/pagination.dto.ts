import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        type: Number,
        default: 1,
        minimum: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Min(1)
    page: number;

    @ApiProperty({
        type: Number,
        default: 1,
        minimum: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Min(1)
    per_page: number;

}