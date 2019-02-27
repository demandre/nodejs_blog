var router = require('express').Router();

/* GET users listing */
router.get('/user', function(req, res, next) {
  res.send('<p>some user Html</p>');
  //res.locals.connection.query('SELECT * from users', function (error, results, fields) {
    //res.send(JSON.stringify({"status": 200, "error": null, "response": 'test'}));
    //if (error) throw error;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  //});
});

module.exports = router;
