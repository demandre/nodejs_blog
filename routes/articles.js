var router = require('express').Router();

/* Get articles */
router.get('/articles', function(req, res, next) {
  res.render('articles', {'is_admin': req.session.is_admin});
});

module.exports = router;
