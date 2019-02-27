var router = require('express').Router();

var userRoutes = require('./user');
var generalRoutes = require('./general')

router.use(userRoutes);
router.use(generalRoutes);

module.exports = router;