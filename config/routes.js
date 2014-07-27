// config/routes.js
var User = require('../models/user.js');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('test.ejs');
	});

	app.get('/test', function(req, res) {
		res.render('test2.ejs');
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', 
		{
			failureRedirect: '/'
		},
		function(req, res) {
			res.redirect('/test');
		}
	));

	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/test',
			failureRedirect: '/'
		}));

	app.get('/auth/instagram', passport.authenticate('instagram'));

	app.get('/auth/instagram/callback', passport.authenticate('instagram', {
		successRedirect: '/test',
		failureRedirect: '/'
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect();
	});

};