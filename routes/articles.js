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

module.exports = router;
