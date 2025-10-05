const Joi = require('joi');

// Define the schema for user validation
const userValidationSchema = Joi.object({
  // Allow letters, digits and spaces (numbers are allowed but not required)
  fullname: Joi.string().trim().pattern(/^[A-Za-z0-9 ]+$/).min(3).max(50).required(),
  username: Joi.string().alphanum().min(3).max(35).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(), // { tlds: { allow: false } } Disable TLD validation for flexibility
});

// Middleware to validate incoming request body for user creation/update
function validateUser(req, res, next) {
  const options = { abortEarly: false, stripUnknown: true }; // Collect all errors, remove unknown keys
  
  // Validate req.body against the schema
  const { error, value } = userValidationSchema.validate(req.body, options);

  if (error) {
    // Map Joi details to a simple errors array
    const errors = error.details.map((d) => ({ message: d.message, path: d.path }));
    return res.status(400).json({ errors });
  }

  // replace req.body with the validated & sanitized value
  req.body = value;
  next();
}

module.exports = { userValidationSchema, validateUser };
