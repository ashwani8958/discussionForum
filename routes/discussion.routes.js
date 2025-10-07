const express = require('express');
const router = express.Router();

const discussionController = require('../controllers/discussionController');

// Simple router-level logger: logs method, path, baseUrl and timestamp for every request
router.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.path} - ${req.baseUrl}`);
    next();
});

// Route to create a new discussion
router.post('/new', discussionController.createDiscussion);

module.exports = router;