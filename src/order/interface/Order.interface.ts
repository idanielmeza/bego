import { ITruckDetail } from "src/truck/interface/truck.interface";
import { OrderStatusEnum } from "../enum/status.enum";
import { ILocationDetail } from "src/location/interface/location.interface";
import { IUserDetail } from "src/user/interface/user.interface";

export interface IOrderDetail {
    _id:      string;
    user:    IUserDetail;
    truck:   ITruckDetail;
    status:  OrderStatusEnum;
    pickup:  ILocationDetail;
    dropoff: ILocationDetail;
}