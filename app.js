// Libs
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var port = process.env.PORT || '3000';
// Express
var app = express();
// declaring routes
var routes = require('./routes/');
app.use(routes);
// Views setting
app.set('views', './views');
app.set('view engine', 'pug');
// Use port given
app.set('port', port);
// Use cookie parser
app.use(cookieParser());
// Define static files path
app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function(req, res, next){
  res.locals.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'joris',
    password : 'joris',
    database : 'node_blog'
  });
  //res.locals.connect();
  next();
});

app.listen(port,function () {
  console.log('Server listening on port ' + 3000);
});




