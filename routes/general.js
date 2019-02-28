var router = require('express').Router();

/* GET homepage / login page */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home', message: 'Hello! Please sign-in' });
});

router.post('/', function(req,res) {
  try {
    var email = req.body.email;
    var password = req.body.password;
    var query = 'SELECT user_id,name,first_name,is_admin from user ' +
        "where mail='" + email + "' and password_hash= SHA2('" + password + "',256)";

    res.locals.connection.query(query, function (error, results, fields) {
      if(error != null) {
        res.render('index', { title: 'Home', message: 'We cannot connect you... Try again later!' });
      }
      if(results.length > 0) {
        // Save in session - connect the user
        req.session.user_id=results[0].user_id;
        req.session.name=results[0].name;
        req.session.first_name=results[0].first_name;
        req.session.mail=results[0].mail;
        req.session.avatar_img_path=results[0].avatar_img_path;
        req.session.is_admin=results[0].is_admin;
        // Redirect to user page
        res.redirect('/user');
      } else {
        res.render('index', { title: 'Home', message: 'Wrong credentials... Try again!' });
      }
    });
  } catch {
    res.render('index', { title: 'Home', message: 'We cannot connect you... Try again later!' });
  }
});

/* GET faq page */
router.get('/faq', function(req, res) {
  console.log('faq');
  res.send('<p>some faq Html</p>');
});

module.exports = router;
