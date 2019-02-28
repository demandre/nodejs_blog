var router = require('express').Router();

/* Get users create/search */
router.get('/users', function(req, res, next) {
  if(req.session.is_admin) {
    res.render('users', {'is_admin': req.session.is_admin});
  } else {
    res.redirect('/user');
  }
});

/* Post users create */
router.post('/users/create', function(req, res, next) {
  if(req.session.is_admin) {
    var createUserQuery = "insert into user (name,first_name,mail,password_hash,avatar_img_path,is_admin) values (" +
        "'" + req.body.name + "'," +
        "'" + req.body.first_name + "'," +
        "'" + req.body.mail + "'," +
        "SHA2('" + req.body.password + "',256)," +
        "'" + req.body.avatar_img_path + "'," +
        "" + req.body.is_admin + "" +
        ");";

    res.locals.connection.query(createUserQuery, function (error, results, fields) {
      if(error != null) {
        console.log(error);
        res.render('user', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      } else {
        res.render('user', {'message': 'User has been created!', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/user');
  }
});

module.exports = router;
