var router = require('express').Router();

/* Get users create/search */
router.get('/users', function(req, res, next) {
  if(req.session.is_admin) {
    res.render('users', {'is_admin': req.session.is_admin});
  } else {
    res.redirect('/user');
  }
});

module.exports = router;
