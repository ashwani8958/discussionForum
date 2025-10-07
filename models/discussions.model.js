const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    title:{type:String, required:true, maxLength:150},
    author:{type:String, required:true, immutable:true},
    content:{type:String, default:""},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);