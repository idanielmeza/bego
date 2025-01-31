import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Location {

    @Prop()
    address : string;

    @Prop({
        unique: true
    })
    place_id : string;

    @Prop()
    latitude : number;

    @Prop()
    longitude : number;

    @Prop({
        default: true
    })
    isActive: boolean;
    
}

export const LocationSchema = SchemaFactory.createForClass(Location);