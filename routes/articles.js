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
        console.log('error');
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
            res.render('article', {'article': articleResults[0], 'comments': commentResults, 'is_admin': req.session.is_admin});
        });
      } else {
        res.render('articles', {'message': 'This article does not exists', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles', {'is_admin': req.session.is_admin});
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
          console.log('error');
          res.render('articleModify', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
        }
        if(articleResults.length > 0) {
            res.render('articleModify', {'article': articleResults[0], 'is_admin': req.session.is_admin});
        } else {
          res.render('articleModify', {'message': 'This article does not exists', 'is_admin': req.session.is_admin});
        }
      });
    } else {
      res.redirect('/articles', {'is_admin': req.session.is_admin});
    }
  } else {
    res.redirect('/user');
  }
});

module.exports = router;
