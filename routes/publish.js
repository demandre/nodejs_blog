var router = require('express').Router();

/* Get publish */
router.get('/publish', function(req, res, next) {
  if(req.session.is_admin) {
    res.render('publish', {'is_admin': req.session.is_admin});
  } else {
    res.redirect('/user');
  }
});

/* Post publish */
router.post('/publish', function(req, res, next) {
    if(req.session.is_admin) {
        var createArticleQuery = "insert into article (title,content,author_id,date,cover_img_path) values (" +
            "'" + req.body.title + "'," +
            "'" + req.body.content + "'," +
            "'" + req.session.user_id + "'," +
            "NOW()," +
            "'" + req.body.cover_img_path + "'" +
            ");";

        res.locals.connection.query(createArticleQuery, function (error, results, fields) {
            if(error != null) {
                console.log(error);
                res.render('publish', {'message': 'An error happened... Try again later!', 'is_admin': req.session.is_admin});
            } else {
                res.render('publish', {'message': 'Article has been created!', 'is_admin': req.session.is_admin});
            }
        });
    } else {
        res.redirect('/user');
    }
});

module.exports = router;
