var router = require('express').Router();

/* Get articles */
router.get('/comments', function (req, res) {
  var getCommentsQuery = 'SELECT comment_id,content,user.name as user_name,author_id,date,avatar_img_path ' +
    'from comment inner join user on author_id = user_id ' +
    "where author_id=" + req.session.user_id + ";";
  if (req.session.is_admin) {
    getCommentsQuery = 'SELECT comment_id,content,user.name as user_name,author_id,date,avatar_img_path ' +
      'from comment inner join user on author_id = user_id;'
  }

  res.locals.connection.query(getCommentsQuery, function (error, results) {
    if (error != null) {
      console.log(error);
      res.render('comments', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    } else {
      if (results.length > 0) {
        res.render('comments', {'comments': results, 'is_admin': req.session.is_admin});
      } else {
        res.render('comments', {'message': 'There is no comment to display!', 'is_admin': req.session.is_admin});
      }
    }
  });
});

module.exports = router;
