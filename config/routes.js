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


}