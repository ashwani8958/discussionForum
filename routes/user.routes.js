const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validateUser, authRequestValidator, validateusername } = require('../middlewares/validation.middleware');

// Simple router-level logger: logs method, path, baseUrl and timestamp for every request
router.use((req, res, next) => {
	const time = new Date().toISOString();
	// req.baseUrl is the path this router is mounted on in the main app
	console.log(`[Router] ${time} - ${req.method} ${req.baseUrl}${req.path}`);
	next();
});

// Route for user registration
router.post('/register', validateUser, userController.createUser);

// Route for getting all users
router.get('/all', authRequestValidator, userController.getAllUsers);

// Route for getting user profile by username
router.get('/:username', validateusername, userController.getUserByUsername);

module.exports = router;