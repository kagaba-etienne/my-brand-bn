const express = require('express');
const contact = express.Router();
const contactController = require('../../controllers/api/contactController');


contact.post('/', contactController.send_query);

module.exports = contact;