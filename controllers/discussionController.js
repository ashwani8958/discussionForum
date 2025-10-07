const userService = require('../service/user.service');
const DiscussionService = require('../service/discussion.service');

// Controller to handle discussion creation
async function createDiscussion(req, res) {
    const { title, username, content } = req.body;

    try {
        // Verify user exists
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ "message": "user not found", user });
        }
        const newDiscussion = await DiscussionService.createNewDiscussion(title, user.fullname, content);
        res.status(201).json(newDiscussion);

    }catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    createDiscussion,
};