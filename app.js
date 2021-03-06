// Libs
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();
// Vars
var port = '3000';

// Views setting
app.set('views', './views');
app.set('view engine', 'pug');

// Use port given
app.set('port', port);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': false}));
// parse application/json
app.use(bodyParser.json());

// Define static files path
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
app.use(function mysqlConnect (req, res, next) {
  res.locals.connection = mysql.createConnection({
    'host': 'localhost',
    'user': 'joris',
    'password': 'joris',
    'database': 'node_blog'
  });
  next();
});

// Cookies/Session config
app.use(cookieSession({
  'name': 'session',
  'keys': ['key1', 'key2'],
  'maxAge': 24 * 60 * 60 * 1000
}));

// Log all requests
app.use(function logRequest (req, res, next) {
  console.log(req.headers);
  console.log(req.body);
  console.log(req.session);
  next();
});

// Redirect not logged in users
app.use(function redirectNotLoggedIn (req, res, next) {
  if (req.url !== '/') { // if not login page
    if (req.session.user_id === undefined) { // and not connected
      res.redirect('/'); // redirect to login page
      return;
    }
  }
  next();
});

// Parse url params and store in request
app.use(function parseUrlParams (req, res, next) {
  req.urlParams = url.parse(req.url, true).query;
  next();
});

// declaring routes
var routes = require('./routes/');

app.use(routes);

app.listen(port, function listen () {
  console.log('Server listening on port ' + 3000);
});