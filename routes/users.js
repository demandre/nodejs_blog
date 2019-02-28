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
        res.render('users', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      } else {
        res.render('users', {'message': 'User has been created!', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/user');
  }
});

/* Post users search */
router.post('/users/search', function(req, res, next) {
    if(req.session.is_admin) {
        var searchUsersQuery = "select user_id,name,first_name,mail,avatar_img_path,count(comment.author_id) as comment_count from user " +
            "left join comment on user.user_id = comment.author_id " +
            "where user.name like '%"+ req.body.search_terms +"%' " +
            "or user.first_name like '%"+ req.body.search_terms +"%' " +
            "or user.mail like '%"+ req.body.search_terms +"%' " +
            "group by user.user_id;";

        res.locals.connection.query(searchUsersQuery, function (error, results, fields) {
            if(error != null) {
                console.log(error);
                res.render('users', {'users_message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
            } else {
                if(results.length > 0) {
                    res.render('users', {'users': results, 'is_admin': req.session.is_admin});
                } else {
                    res.render('users', {'users_message': 'No users contains those terms', 'is_admin': req.session.is_admin});
                }
            }
        });
    } else {
        res.redirect('/user');
    }
});

module.exports = router;
