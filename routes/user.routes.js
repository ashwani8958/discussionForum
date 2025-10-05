const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const { validateUser } = require('../middlewares/validation.middleware');

// Simple router-level logger: logs method, path, baseUrl and timestamp for every request
router.use((req, res, next) => {
	const time = new Date().toISOString();
	// req.baseUrl is the path this router is mounted on in the main app
	console.log(`[Router] ${time} - ${req.method} ${req.baseUrl}${req.path}`);
	next();
});

// Sample route for user registration
router.post('/register', validateUser, userController.createUser);

// Sample route for user login
router.get('/all', (req, res) => {
    // Login logic here
    res.status(200).send('User logged in successfully');
});

router.get('/:username', (req, res) => {
    // Profile logic here
    res.status(200).send('User profile data');
});

module.exports = router;