// app.js - the central file of the app that puts everything together

// requiring all modules
var flash = require('connect-flash'),
	express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');

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
