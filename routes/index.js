var router = require('express').Router();

var userRoutes = require('./user');
var loginRoutes = require('./login')

router.use(userRoutes);
router.use(loginRoutes);

module.exports = router;