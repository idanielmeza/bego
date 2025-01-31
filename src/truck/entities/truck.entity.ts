
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { User } from "src/common/entities/user.entity";

@Schema()
export class Truck extends Document {
    
    @Prop({
        ref: User
    })
    userId: ObjectId;

    @Prop()
    year: string;

    @Prop()
    color: string;

    @Prop()
    plates: string;

    @Prop({
        default: true
    })
    isActive: boolean;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);