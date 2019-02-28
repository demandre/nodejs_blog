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

    res.locals.connection.query(selectArticleQuery, function (error, results, fields) {
      if(error != null) {
        res.render('articles', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
      }
      if(results.length > 0) {
        res.render('article', {'article': results[0], 'is_admin': req.session.is_admin});
      } else {
        res.render('articles', {'message': 'This article does not exists', 'is_admin': req.session.is_admin});
      }
    });
  } else {
    res.redirect('/articles', {'is_admin': req.session.is_admin});
  }
});

module.exports = router;
