import { UserParser } from "src/user/util/user.parser";
import { IOrderDetail } from "../interface/Order.interface";
import { LocationParser } from "src/location/util/location.parser";
import { TruckParser } from "src/truck/util/truck.parser";

export class OrderParser {
    static parseOrderToOrderVO( order ) : IOrderDetail {

        const {user, truck, pickup, dropoff} = order;

        return {
            _id: order._id,
            user: UserParser.parseUserToUserVO(user),
            truck: TruckParser.parseTruckToTruckVO(truck),
            status: order.status,
            pickup: LocationParser.parseLocationToLocationVO(pickup),
            dropoff: LocationParser.parseLocationToLocationVO(dropoff)
        }
    }
}