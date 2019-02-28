var router = require('express').Router();

var userRoutes = require('./user');
var loginRoutes = require('./login');
var logoutRoutes = require('./logout')

router.use(userRoutes);
router.use(loginRoutes);
router.use(logoutRoutes);

module.exports = router;