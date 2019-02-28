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
    if (req.session.is_admin) {
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
      //Verify it is its own comment
      var selectCommentAuthorIdQuery = 'select author_id from comment ' +
        'where comment_id=' + req.urlParams.id + ";";

      res.locals.connection.query(selectCommentAuthorIdQuery, function (error, author, fields) {
        if (error != null) {
          console.log(error);
          res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        }
        if (author.length > 0) {
          if (author[0].author_id === req.session.user_id) {
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
            res.render('articles', {'message': 'It is not your comment', 'is_admin': req.session.is_admin});

          }
        } else {
          res.render('articles', {'message': '\'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        }
      });
    }
  } else {
    res.redirect('/articles');
  }
});

/* Get modify comment */
router.get('/comment/modify', function(req, res, next) {
  if(req.urlParams.id) {
    //Verify it is its own comment
    var selectCommentAuthorIdQuery = 'select author_id from comment ' +
      'where comment_id=' + req.urlParams.id + ";";

    res.locals.connection.query(selectCommentAuthorIdQuery, function (error, author, fields) {
      if (error != null) {
        console.log(error);
        res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      }
      if (author.length > 0) {
        if (author[0].author_id === req.session.user_id) {
          var selectCommentQuery = 'SELECT comment_id,content from comment ' +
            "where comment_id=" + req.urlParams.id + ";";

          res.locals.connection.query(selectCommentQuery, function (error, results, fields) {
            if(error != null) {
              console.log(error);
              res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
            }
            if(results.length > 0) {
              res.render('comment', {'comment': results[0], 'is_admin': req.session.is_admin});
            } else {
              res.render('articles', {'message': 'This comment does not exists', 'is_admin': req.session.is_admin});
            }
          });
        } else {
          res.render('articles', {'message': 'It is not your comment', 'is_admin': req.session.is_admin});

        }
      } else {
        res.render('articles', {'message': '\'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles');
  }
});

/* Post modify comment */
router.post('/comment/modify', function(req, res, next) {
  if(req.urlParams.id) {
    //Verify it is its own comment
    var selectCommentAuthorIdQuery = 'select author_id from comment ' +
      'where comment_id=' + req.urlParams.id + ";";

    res.locals.connection.query(selectCommentAuthorIdQuery, function (error, author, fields) {
      if (error != null) {
        console.log(error);
        res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      }
      if (author.length > 0) {
        if (author[0].author_id === req.session.user_id) {
          var updateCommentQuery = "update comment " +
            "set content ='" + req.body.content + "'," +
            "date = NOW() " +
            "where comment_id=" + req.urlParams.id + ";";

          res.locals.connection.query(updateCommentQuery, function (error, results, fields) {
            if (error != null) {
              console.log(error);
              res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
            } else {
              res.render('articles', {'message': 'The comment has been updated!', 'is_admin': req.session.is_admin});
            }
          });
        } else {
          res.render('articles', {'message': 'It is not your comment', 'is_admin': req.session.is_admin});

        }
      } else {
        res.render('articles', {'message': '\'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles');
  }
});

module.exports = router;
