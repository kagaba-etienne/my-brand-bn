const express = require('express');
const blogs = express.Router();
const blogController = require('../../controllers/api/blogController');
const { requireAuth } = require('../../middleware/api/authMiddleware');

blogs.get('/', blogController.blog_index);

blogs.post('/', requireAuth, blogController.blog_create);

blogs.delete('/:id', requireAuth, blogController.blog_delete);

blogs.post('/:id', requireAuth, blogController.blog_comment);

blogs.patch('/:id', requireAuth, blogController.blog_update);

blogs.get('/:id', blogController.blog_get_one);
module.exports = blogs;