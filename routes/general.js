var router = require('express').Router();

/* GET homepage */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home', message: 'Hello world!' })
});

/* GET faq page */
router.get('/faq', function(req, res) {
  res.send('<p>some faq Html</p>');
});

module.exports = router;
