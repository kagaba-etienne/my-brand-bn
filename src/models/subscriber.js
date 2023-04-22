const Mail = require('../models/smtpserver');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email']
    }
}, { timestamps: true });

subscriberSchema.statics.send = async (email) => {
    await Mail(email);
};
const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;