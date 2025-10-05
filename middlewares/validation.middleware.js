// Central place to export validation middlewares
const { validateUser } = require('../validations/user.validator');

module.exports = {
  validateUser,
};
