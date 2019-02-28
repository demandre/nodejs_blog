var router = require('express').Router();

/* GET users listing */
router.get('/user', function(req, res, next) {
  res.render('user', {'is_admin': req.session.is_admin});
});

module.exports = router;
