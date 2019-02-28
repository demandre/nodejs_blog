var router = require('express').Router();

/* Get users create/search */
router.get('/users', function (req, res) {
  if (req.session.is_admin) {
    res.render('users', {'is_admin': req.session.is_admin});
  } else {
    res.redirect('/user');
  }
});

/* Post users create */
router.post('/users/create', function (req, res) {
  if (req.session.is_admin) {
    var createUserQuery = "insert into user (name,first_name,mail,password_hash,avatar_img_path,is_admin) values (" +
      "'" + req.body.name + "'," +
      "'" + req.body.first_name + "'," +
      "'" + req.body.mail + "'," +
      "SHA2('" + req.body.password + "',256)," +
      "'" + req.body.avatar_img_path + "'," +
      "" + req.body.is_admin + "" +
      ");";

    res.locals.connection.query(createUserQuery, function (error, results) {
      if (error != null) {
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
router.post('/users/search', function (req, res) {
  if (req.session.is_admin) {
    var searchUsersQuery = "select user_id,name,first_name,mail,avatar_img_path,count(comment.author_id) as comment_count from user " +
      "left join comment on user.user_id = comment.author_id " +
      "where user.name like '%" + req.body.search_terms + "%' " +
      "or user.first_name like '%" + req.body.search_terms + "%' " +
      "or user.mail like '%" + req.body.search_terms + "%' " +
      "group by user.user_id;";

    res.locals.connection.query(searchUsersQuery, function (error, results) {
      if (error != null) {
        console.log(error);
        res.render('users', {
          'users_message': 'An error happened... Try again later!',
          'is_admin': req.session.is_admin
        });
      } else {
        if (results.length > 0) {
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

/* Get users modify */
router.get('/users/modify', function (req, res) {
  if (req.session.is_admin) {
    if (req.urlParams.id) {
      var selectUserQuery = 'SELECT user_id,name,first_name,mail,avatar_img_path from user ' +
        "where user_id=" + req.urlParams.id + ";";

      res.locals.connection.query(selectUserQuery, function (error, results) {
        if (error != null) {
          console.log(error);
          res.render('users', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        }
        if (results.length > 0) {
          res.render('userModify', {'user': results[0], 'is_admin': req.session.is_admin});
        } else {
          res.render('users', {'message': 'This user does not exists', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/users');
    }
  } else {
    res.redirect('/user');
  }
});

/* Post users modify */
router.post('/users/modify', function (req, res) {
  if (req.session.is_admin) {
    if (req.urlParams.id) {
      var updateUserQuery = "update user " +
        "set name ='" + req.body.name + "'," +
        "first_name ='" + req.body.first_name + "'," +
        "mail = '" + req.body.mail + "'," +
        "avatar_img_path = '" + req.body.avatar_img_path + "'" +
        "where user_id=" + req.urlParams.id + ";";

      res.locals.connection.query(updateUserQuery, function (error, results) {
        if (error != null) {
          console.log(error);
          res.render('users', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        } else {
          res.render('users', {'message': 'User has been updated!', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/users');
    }
  } else {
    res.redirect('/user');
  }
});

/* Get users delete */
router.get('/users/delete', function (req, res) {
  if (req.session.is_admin) {
    if (req.urlParams.id) {
      var deleteUserQuery = 'DELETE from user ' +
        "where user_id=" + req.urlParams.id + ";";

      res.locals.connection.query(deleteUserQuery, function (error, results) {
        if (error != null) {
          console.log(error);
          res.render('users', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        } else {
          res.render('users', {'message': 'User has been deleted', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/users');
    }
  } else {
    res.redirect('/user');
  }
});
module.exports = router;
