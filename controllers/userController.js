const userService = require('../service/user.service');

// Controller to handle user creation

async function createUser(req, res) {
    const { fullname, username, email } = req.body;

    try {
        const newUser = await userService.createUser(fullname, username, email);
        res.status(201).json(newUser);
    } catch (error) {
        if(error.reason === 'Already Exists in DB') {
            return res.status(409).json({ error});
        }
        res.status(500).json({ error });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        if(error.reason === 'No Users in DB') {
            return res.status(404).json({ error });
        }
        res.status(500).json({ error });
    }
}

async function getUserByUsername(req, res) {
    const { username } = req.params;
    try {
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found!') {
            return res.status(404).json({ error });
        }
        res.status(500).json({ error });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
};