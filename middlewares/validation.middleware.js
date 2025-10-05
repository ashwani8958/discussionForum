// Central place to export validation middlewares
const { validateUser } = require('../validations/user.validator');

function authRequestValidator(req, res, next) {

    const headerAuthPassword = req.headers["x-api-key"];
    if(headerAuthPassword === process.env.AUTHENTICATED_USER_KEY) {
        next();
    } else {
        // req is bad
        res.status(403).json({ message: "Unauthorised Access" });
    }

}

function validateusername(req, res, next) {

    const { username } = req.params ;
    if (typeof username === 'string' && username.trim().length >= 3 && username.trim().length <= 25 && /^[a-zA-Z0-9]+$/.test(username)) {
        next();
    } else {
        res.status(404).json({ message: "Invalid username." });
    }

}
module.exports = {
  validateUser,
  validateusername,
  authRequestValidator
};
