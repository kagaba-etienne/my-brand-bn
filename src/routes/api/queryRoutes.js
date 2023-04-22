const express = require('express');
const queries = express.Router();

const queryController = require('../../controllers/api/queryController');

queries.get('/:id', queryController.query_get);
queries.delete('/:id', queryController.query_delete);
queries.patch('/:id', queryController.query_patch);
queries.get('/', queryController.query_get_all);

module.exports = queries;