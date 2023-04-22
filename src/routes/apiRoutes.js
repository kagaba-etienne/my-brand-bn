const api = require('express').Router();

//controllers
const subscriberController = require('../controllers/api/subscriberController');

//routes
const contactRoutes = require('./api/contactRoutes');
const projectRoutes = require('./api/projectRoutes');
const authRoutes = require('./api/authRoutes');
const blogRoutes = require('./api/blogRoutes')
const queryRoutes = require('./api/queryRoutes');
const dashboardRoutes = require('./api/dashboardRoutes')
const { requireAuth } = require('../middleware/api/authMiddleware');

//auth routes
api.use('/api/user', authRoutes);

// Available routes
api.use('/api/projects', projectRoutes);
api.use('/api/contact', contactRoutes);
api.use('/api/blogs', blogRoutes);
api.use('/api/queries', requireAuth, queryRoutes);
api.post('/api/subscriber', subscriberController.subscriber_mail_save);
api.use('/api/admin', requireAuth, dashboardRoutes);
module.exports = api;