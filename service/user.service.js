const userModel = require('../models/user.model');

class UserService {

    static async createUser(fullname, username, email) {

        // business logic: check if user with same username or email exists
        try {
            const existing = await userModel.findOne({ $or: [{ username }, { email }] });
            if (existing) {
                // throw a specific object that the controller expects
                throw { message: 'Failed to create new user', reason: 'Already Exists in DB' };
            }

            // create new user (note: model field is 'username')
            const userObj = new userModel({ fullname, username, email });

            // database
            const response = await userObj.save();
            return response;

        } catch (error) {
            // rethrow so controller can send proper HTTP response
            throw error;
        }
    }
}

module.exports = UserService;