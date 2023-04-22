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

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        unique: true
    },
    publish: {
        type: Boolean,
        required: true
    },
    body: {
        type: String,
        required: [true, 'Description of the project required']
    },
    rest: {
        type: String,
        required: false
    },
    shortDescr: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        required: true,
        validate: [isValid, 'Please enter a valid link']
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;