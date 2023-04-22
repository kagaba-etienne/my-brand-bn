const express = require('express');
const dash = express.Router();
const dashBoardController = require('../../controllers/api/dashboardController');


dash.get('/', dashBoardController.get_index);

module.exports = dash;