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

    static async getAllUsers() {
        try {
            const users = await userModel.find({ }, '-__v').lean(); // exclude __v field lean() returns plain JS objects which is more efficient for read-only 
            
            // If no users found, throw an error
            if(!users || users.length === 0) {
                throw { message: 'No users found', reason: 'No Users in DB' };
            }

            return users;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await userModel.findOne({ username }, '-__v').lean();  
            if (!user) {
                throw { message: "User not found!", username };
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;