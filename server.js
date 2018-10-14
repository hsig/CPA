// server.js

    // setup ======================================================================
    var express     = require('express');
    var app         = express();
    var favicon     = require ('serve-favicon');
    var port        = process.env.PORT || 9090;                 // set the port
    var bodyParser  = require('body-parser');                   // pull information from HTML POST (express4)
    var mongoose    = require('mongoose');                      // mongoose for mongodb
    var database    = require('./config/database');             // load the database config
    var morgan      = require('morgan');                        // log requests to the console (express4)
    var passport	  = require('passport');                      // for security
    //var cookieParser = require('cookie-parser');
    //var methodOverride = require('method-override');          // simulate DELETE and PUT (express4)
    //var jwt = require('jsonwebtoken');

    // configuration ===============================================================
    mongoose.connect(database.url);                                 // connect to mongoDB database on modulus.io
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(favicon(__dirname + '/public/favicon.ico'));

    //app.use(methodOverride());
    //app.use(cookieParser());
    app.all('*', function(req, res, next) {
         res.header('Access-Control-Allow-Origin', '*');
         res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
         res.header("Access-Control-Allow-Credentials", "true");
         res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
         next();
    });
    // passport ======================================================================
    require('./config/passport')(passport);
    app.use(passport.initialize());                                 // Use the passport package in our application

    // routes ========================================================================
    require('./bin/routes/app.routes.js')(app, express, passport);

    // listen (start app with node or nodemon server.js) ==============================
    app.listen(port);
    console.log("The API is running on " + port);
