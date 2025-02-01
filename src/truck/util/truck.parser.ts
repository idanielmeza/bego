export class TruckParser {
    static parseTruckToTruckVO (truck) {
        return {
            _id: truck._id,
            year: truck.year,
            color: truck.color,
            plates: truck.plates
        }
    }
}