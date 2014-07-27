// config/passport.js

//load everything needed in this file
var FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	flash = require('connect-flash'),
	User = require('../models/user.js'),
	configAuth = require('./auth.js');

module.exports = function(passport) {

	// Serialize User
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		// call values found in auth.js
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(token, refreshToken) {

	}
	));

	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.consumerKey,
		consumerSecret: configAuth.twitterAuth.consumerSecret,
		callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, done) {
		process.nextTick(function() {
			// User.findOne( { 'twitter.id': profile.id }, function(err, user) {
			// 	if (err) {
			// 		return done(err);
			// 	}

			// 	if (user) {
			// 		return done(null, user);
			// 	}
			// 	console.log('hi');
			// 	console.log(profile.username);
			// 	done(null, user);
			// });
			console.log(profile.username);
			console.log('hi');
		});
	}));
};