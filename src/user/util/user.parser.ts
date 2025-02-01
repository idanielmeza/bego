export class UserParser {
    static parseUserToUserVO( user ) {
        return {
            _id: user._id,
            email: user.email
        }
    }
}