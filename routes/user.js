var router = require('express').Router();

/* GET users listing */
router.get('/user', function(req, res, next) {
  res.render('user');
});

module.exports = router;
