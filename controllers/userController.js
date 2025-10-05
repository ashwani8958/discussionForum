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

module.exports = {
    createUser,
};