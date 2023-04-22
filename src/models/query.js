const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const querySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: [true, 'Can not send blank message']
    },
    photo: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);
module.exports = Query;