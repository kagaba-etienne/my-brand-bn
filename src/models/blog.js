const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fetch = require('node-fetch');

const isValid = async function (link) {
    try {
        const res = await fetch(`${link}`);
        if (res.status == 200 ) {
            return true
        } else {

            return false
        }
    }
    catch {
        return false
    }
}

const blogSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Please enter a title'],
        description: 'The auto generated id of the blog post'
    },
    body: {
        type: Array,
        required: true,
        description: 'The body paragraphs'
    },
    shortDescr: {
        type: String,
        required: [true, 'Please enter body of the blog'],
        description: 'The short description of a blog post usually taken from the first 200 characters of the first paragraph'
    },
    coverPhoto: {
        type: String,
        required: true,
        validate: [isValid, 'Please enter a valid link'],
        description: 'Cover photo link'
    },
    commentsCount: {
        type: Number,
        required: true,
        description: 'The number of comments on a blog post'
    },
    publish: {
        type: Boolean,
        required: true,
        description: 'The permission to publish the blog post'
    },
    author: {
        type: String,
        required: true,
        description: 'The blog post author'
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;