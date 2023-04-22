const express = require('express');
const auth = express.Router();
const authController = require('../../controllers/api/authController');
const { requireAuth } = require('../../middleware/api/authMiddleware');

auth.post('/signup', authController.post_signup);
auth.post('/login', authController.post_login);
auth.get('/', requireAuth, authController.check_auth);

module.exports = auth;