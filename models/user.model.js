const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullname: { type: String, maxLength: 50, default: "" },
    username: { type: String, required: true, unique: true, maxLength: 50,},
    email: { type: String, required: true, unique: true, validate: (email)=> validator.isEmail(email) },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;