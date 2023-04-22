const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    action:{
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);
module.exports = Log;