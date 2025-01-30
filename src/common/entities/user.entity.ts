
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    
    @Prop({
        unique: true,
        index: true
    })
    email: string;

    @Prop()
    password: string;

    @Prop({
        default: true
    })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);