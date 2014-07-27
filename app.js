// app.js - the central file of the app that puts everything together

// requiring all modules
var flash = require('connect-flash'),
	express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	facebook = require('fb');

// instantiate our Express app
var app = express();

// connect to our mongoDB database. For now, it's local
mongoose.connect('mongodb://localhost:27017/mystory');
// database port: 27017, database: mystory

// passing the passport into the file that takes care of passport configuration
require('./config/passport.js')(passport);

// set up EJS for templating
app.set('view engine', 'ejs');

// include all files that aren't in the root folder by default
app.use('/views', express.static(__dirname + '/views'));
// not sure if this is required, but just to be safe
app.use('/assets', express.static(__dirname + '/views/assets'));

// set up the app to use modules when required
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'northwesternandshmoop'}));
app.use(passport.initialize());
app.use(passport.session());

// Link to our routes.js
require('./config/routes.js')(app, passport);

app.listen(8080, function() {
	console.log('Listening on port 8080');
});