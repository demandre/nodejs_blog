var router = require('express').Router();

/* Get user info */
router.get('/user', function(req, res, next) {
  var selectUserQuery = 'SELECT name,first_name,mail,avatar_img_path from user ' +
      "where user_id=" + req.session.user_id + ";";

  res.locals.connection.query(selectUserQuery, function (error, results, fields) {
    if(error != null) {
      res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    }
    if(results.length > 0) {
      res.render('user', {'user': results[0], 'is_admin': req.session.is_admin});
    } else {
      res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    }
  });
});

module.exports = router;
