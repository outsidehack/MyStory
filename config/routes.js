// config/routes.js
var User = require('../models/user.js'),
	facebook = require('fb');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('test.ejs');
	});

	app.get('/test', function(req, res) {
		console.log(req.user.facebook.token);
		//console.log(req.user);
		facebook.setAccessToken(req.user.facebook.token);
		var query = ['SELECT uid, name, pic_square FROM user WHERE uid=me()'];
		facebook.api('fql', { q: query }, function(res) {
			if (!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
 			   return;
			}
			console.log(res.data[0].fql_result_set);
		});

		res.render('test2.ejs');
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', 
		{
			successRedirect: '/test',
			failureRedirect: '/'
		}));

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