import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { User } from "src/common/entities/user.entity";
import { Truck } from "src/truck/entities/truck.entity";
import { OrderStatusEnum } from "../enum/status.enum";
import { Location } from "src/location/entities/location.entity";

@Schema()
export class Order {

    @Prop({
        ref: () => User,
        type: ObjectId
    })
    user: ObjectId;

    @Prop({
        ref: () => Truck,
        type: ObjectId
    })
    truck: ObjectId;

    @Prop({
        type: String,
        enum: OrderStatusEnum 
    })
    status: OrderStatusEnum;

    @Prop({
        type: ObjectId,
        ref: () => Location
    })
    pickup: ObjectId

    @Prop({
        type: ObjectId,
        ref: () => Location
    })
    dropoff: ObjectId

}

export const OrderSchema = SchemaFactory.createForClass(Order);
