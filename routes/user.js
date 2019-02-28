var router = require('express').Router();

/* GET users listing */
router.get('/user', function(req, res, next) {
  res.locals.connection.query('SELECT * from user', function (error, results, fields) {
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

module.exports = router;
