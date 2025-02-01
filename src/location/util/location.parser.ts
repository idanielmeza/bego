export class LocationParser {
    static parseLocationToLocationVO( location ){
        return {
            _id: location._id,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
            placeId: location.place_id
        }
    }
}