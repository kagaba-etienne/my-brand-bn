const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    blog: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: true
    },
    saveCookie: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    replyTo: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;