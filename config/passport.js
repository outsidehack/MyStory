// config/passport.js

//load everything needed in this file
var FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	InstagramStrategy = require('passport-instagram').Strategy;

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

	// Facebook login authentication
	passport.use(new FacebookStrategy({
		// call values found in auth.js
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(token, refreshToken, profile, done) {
		process.nextTick(function() {
			User.findOne( { 'facebook.id': profile.id}, function(err, user) {
				// if error, throw error
				if (err) {
					return done(err);
				}
				// if user found, return that user
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.facebook.id = profile.id;
					newUser.facebook.token = token;
					newUser.facebook.email = profile.emails[0].value;
					newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
					newUser.facebook.refreshToken = refreshToken;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}
	));

	//Twitter login authentication
	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.consumerKey,
		consumerSecret: configAuth.twitterAuth.consumerSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
	function(token, tokenSecret, profile, done) {
		process.nextTick(function() {
			User.findOne( { 'twitter.id': profile.id }, function(err, user) {
				console.log(profile);
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.screenName = profile.username;
					newUser.twitter.secret = tokenSecret;
					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));

	// Instagram login authentication
	passport.use(new InstagramStrategy( {
		clientID: configAuth.instagramAuth.clientID,
		clientSecret: configAuth.instagramAuth.clientSecret,
		callbackURL: configAuth.instagramAuth.callbackURL
	}, 
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
			User.findOne( { 'instagram.id': profile.id }, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					console.log(profile);
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.instagram.id = profile.id;
					newUser.instagram.token = accessToken;
					newUser.instagram.username = profile.username;
					newUser.instagram.name = profile.displayName;
					newUser.instagram.refreshToken = refreshToken;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}

			});
		});
	}
	))

};