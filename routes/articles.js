var router = require('express').Router();

/* Get articles */
router.get('/articles', function(req, res, next) {
  var getArticlesQuery = "Select article_id,title,cover_img_path from article;";

  res.locals.connection.query(getArticlesQuery, function (error, results, fields) {
    if(error != null) {
      console.log(error);
      res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
    } else {
      if(results.length > 0) {
        res.render('articles', {'articles': results, 'is_admin': req.session.is_admin});
      } else {
        res.render('articles', {'message': 'There is no article!', 'is_admin': req.session.is_admin});
      }
    }
  });
});


/* Get articles see */
router.get('/articles/see', function(req, res, next) {
  if(req.urlParams.id) {
    var selectArticleQuery = 'SELECT * from article ' +
      "where article_id=" + req.urlParams.id + ";";

    res.locals.connection.query(selectArticleQuery, function (error, articleResults, fields) {
      if(error != null) {
        console.log(error);
        res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      }
      if(articleResults.length > 0) {
        var selectCommentQuery = 'SELECT comment_id,content,user.name as user_name,author_id,date,avatar_img_path ' +
          'from comment inner join user on author_id = user_id ' +
          "where article_id=" + req.urlParams.id + ";";

        res.locals.connection.query(selectCommentQuery, function (error, commentResults, fields) {
          if(error != null) {
            console.log(error);
          }
            res.render('article', {'article': articleResults[0], 'comments': commentResults, 'user_id': req.session.user_id,'is_admin': req.session.is_admin});
        });
      } else {
        res.render('articles', {'message': 'This article does not exists', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles');
  }
});

/* Get articles modify */
router.get('/articles/modify', function(req, res, next) {
  if(req.session.is_admin) {
    if(req.urlParams.id) {
      var selectArticleQuery = 'SELECT * from article ' +
        "where article_id=" + req.urlParams.id + ";";

      res.locals.connection.query(selectArticleQuery, function (error, articleResults, fields) {
        if(error != null) {
          console.log(error);
          res.render('articleModify', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        }
        if(articleResults.length > 0) {
            res.render('articleModify', {'article': articleResults[0], 'is_admin': req.session.is_admin});
        } else {
          res.render('articleModify', {'message': 'This article does not exists', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/articles');
    }
  } else {
    res.redirect('/user');
  }
});

/* Post articles modify */
router.post('/articles/modify', function(req, res, next) {
  if(req.session.is_admin) {
    if(req.urlParams.id) {
      var updateArticleQuery = "update article " +
        "set title ='" + req.body.title + "'," +
        "content ='" + req.body.content + "'," +
        "cover_img_path = '" + req.body.cover_img_path + "'," +
        "date = NOW() " +
        "where article_id=" + req.urlParams.id + ";";

      res.locals.connection.query(updateArticleQuery, function (error, articleResults, fields) {
        if(error != null) {
          console.log(error);
          res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        } else {
          res.render('articles', {'message': 'The article has been updated!', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/articles');
    }
  } else {
    res.redirect('/user');
  }
});

/* Get articles delete */
router.get('/articles/delete', function(req, res, next) {
  if(req.session.is_admin) {
    if(req.urlParams.id) {
      var deleteArticleQuery = 'DELETE from article ' +
        "where article_id=" + req.urlParams.id + ";";

      res.locals.connection.query(deleteArticleQuery, function (error, articleResults, fields) {
        if(error != null) {
          console.log(error);
          res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        } else {
          res.render('articles', {'message': 'The article has been deleted!', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/articles');
    }
  } else {
    res.redirect('/user');
  }
});

module.exports = router;
