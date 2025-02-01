import { IsEnum, IsMongoId, IsString } from "class-validator";
import { OrderStatusEnum } from "../enum/status.enum";

export class CreateOrderDto {

    @IsString()
    @IsMongoId()
    user: string;

    @IsString()
    @IsMongoId()
    truck: string;

    @IsEnum( OrderStatusEnum, {
        message: 'Status must be a valid enum value from'.concat(Object.values(OrderStatusEnum).join(', '))
    })
    status: OrderStatusEnum;

    @IsString()
    @IsMongoId()
    pickup: string;

    @IsString()
    @IsMongoId()
    dropoff: string;
}
