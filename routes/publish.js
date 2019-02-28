var router = require('express').Router();

/* Get publish */
router.get('/publish', function(req, res, next) {
  if(req.session.is_admin) {
    res.render('publish', {'is_admin': req.session.is_admin});
  } else {
    res.redirect('/user');
  }
});

module.exports = router;
