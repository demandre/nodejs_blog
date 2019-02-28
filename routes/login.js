var router = require('express').Router();

/* Get homepage / login page */
router.get('/', function (req, res) {
  res.render('index', {'message': 'Hello! Please sign-in'});
});

/* Post of login form */
router.post('/', function (req, res) {
  try {
    var email = req.body.email;
    var password = req.body.password;
    var query = 'SELECT user_id,name,first_name,is_admin from user ' +
      "where mail='" + email + "' and password_hash= SHA2('" + password + "',256)";

    res.locals.connection.query(query, function (error, results) {
      if (error != null) {
        console.log(error);
        res.render('index', {'message': 'We cannot connect you... Try again later!'});
      }
      if (results.length > 0) {
        // Save in session - connect the user
        req.session.user_id = results[0].user_id;
        req.session.is_admin = results[0].is_admin;
        // Redirect to user page
        res.redirect('/user');
      } else {
        res.render('index', {'message': 'Wrong credentials... Try again!'});
      }
    });
  } catch {
    res.render('index', {'message': 'We cannot connect you... Try again later!'});
  }
});

module.exports = router;
