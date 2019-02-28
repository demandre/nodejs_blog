var router = require('express').Router();

var userRoutes = require('./user');
var loginRoutes = require('./login');
var logoutRoutes = require('./logout');
var usersRoutes = require('./users');
var publishRoutes = require('./publish');
var articlesRoutes = require('./articles');

router.use(userRoutes);
router.use(loginRoutes);
router.use(logoutRoutes);
router.use(usersRoutes);
router.use(publishRoutes);
router.use(articlesRoutes);

module.exports = router;