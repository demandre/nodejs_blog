var router = require('express').Router();

/* Post add comment to an article */
router.post('/comment/add', function(req, res, next) {
  if(req.urlParams.article_id) {
    var addCommentQuery = "insert into comment (content,author_id,article_id,date) values (" +
      "'" + req.body.content + "'," +
      "'" + req.session.user_id + "'," +
      "'" + req.urlParams.article_id + "'," +
      "NOW()" + ");";

    res.locals.connection.query(addCommentQuery, function (error, results, fields) {
      if(error != null) {
        console.log(error);
        res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      } else {
        res.render('articles', {'message': 'Your comment is added!', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles');
  }
});

/* Get delete comment */
router.get('/comment/delete', function(req, res, next) {
  if(req.urlParams.id) {
    var deleteCommentQuery = "delete from comment " +
      "where comment_id=" + req.urlParams.id + ";";

    res.locals.connection.query(deleteCommentQuery, function (error, results, fields) {
      if(error != null) {
        console.log(error);
        res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      } else {
        res.render('articles', {'message': 'Your comment is deleted!', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles');
  }
});

module.exports = router;
