var router = require('express').Router();

/* Get user info */
router.get('/user', function(req, res, next) {
  var selectUserQuery = 'SELECT name,first_name,mail,avatar_img_path from user ' +
      "where user_id=" + req.session.user_id + ";";

  res.locals.connection.query(selectUserQuery, function (error, results, fields) {
    if(error != null) {
      console.log(error);
      res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    }
    if(results.length > 0) {
      res.render('user', {'user': results[0], 'is_admin': req.session.is_admin});
    } else {
      res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    }
  });
});

/* Post user info */
router.post('/user', function(req, res, next) {
  var updateUserQuery = "update user " +
      "set name ='" + req.body.name + "'," +
      "first_name ='" + req.body.first_name + "'," +
      "mail = '" + req.body.mail + "'," +
      "avatar_img_path = '" + req.body.avatar_img_path + "'" +
      "where user_id=" + req.session.user_id + ";";

  res.locals.connection.query(updateUserQuery, function (error, results, fields) {
    if(error != null) {
      console.log(error);
      res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    } else {
      res.render('user', {'message': 'Your data has been changed!', 'is_admin': req.session.is_admin});
    }
  });
});

/* Get user delete */
router.get('/user/delete', function(req, res, next) {
  var deleteUserQuery = 'DELETE from user ' +
      "where user_id=" + req.session.user_id + ";";

  res.locals.connection.query(deleteUserQuery, function (error, results, fields) {
    if(error != null) {
      console.log(error);
      res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    } else {
      res.render('index', {'message': 'You have been deleted'});
    }
  });
});
module.exports = router;
