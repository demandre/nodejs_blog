var router = require('express').Router();

var userRoutes = require('./user');
var loginRoutes = require('./login');
var logoutRoutes = require('./logout');
var usersRoutes = require('./users');

router.use(userRoutes);
router.use(loginRoutes);
router.use(logoutRoutes);
router.use(usersRoutes);

module.exports = router;