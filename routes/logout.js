var router = require('express').Router();

/* Get homepage / login page */
router.get('/logout', function(req, res) {
  // disconnect
  req.session = null;
  res.redirect('/');
});

module.exports = router;
