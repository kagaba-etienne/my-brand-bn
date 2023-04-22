const express = require('express');
const projects = express.Router();
const projectController = require('../../controllers/api/projectController');
const { requireAuth } = require('../../middleware/api/authMiddleware');

projects.get('/', projectController.project_index);
projects.post('/', requireAuth, projectController.project_create);
projects.delete('/:id', requireAuth, projectController.project_delete);
projects.patch('/:id', requireAuth, projectController.project_update);
projects.get('/:id', projectController.project_get_one);

module.exports = projects;