// config/routes.js
var User = require('../models/user.js'),
	facebook = require('fb'),
	twitter = require('twit'),
	instagram = require('instagram-node');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('test.ejs');
	});

	app.get('/test', function(req, res) {
		var trendsArray;
		var T = new twitter({
				consumer_key: configAuth.twitterAuth.consumerKey,
				consumer_secret: configAuth.twitterAuth.consumerSecret,
				access_token: req.user.twitter.token,
				access_token_secret: req.user.twitter.secret
			}),
			minTimeStamp = new Date("2013-08-08").getTime() / 1000,
			maxTimeStamp = new Date("2014-08-12").getTime() / 1000;

		// T.get('trends/place', {
		// 	id: '23424977'
		// }, function(err, data, response) {
		// 	trendsArray = data[0].trends;
		// 	console.log(data[0].trends[0]);
		// });

		var stream = [];

		T.get('statuses/user_timeline', {

		}, function(err, data, response) {
			for (var i = 0; i < data.length; i++) {
				var timeStamp = new Date(data[i].created_at).getTime() / 1000;

				data[i].entities.hashtags;

				if (timeStamp < maxTimeStamp && timeStamp > minTimeStamp) {
					T.get('statuses/oembed', {
						id: data[i].id_str
					}, function(err, tweetData, response) {
						//console.log(tweetData.html);
						stream.push({
							time: timeStamp,
							html: tweetData.html
						});
					});
				}
			}

			var insta = instagram.instagram();
			insta.use({
				access_token: req.user.instagram.token
			});

			insta.user_media_recent(req.user.instagram.id, {
				min_timestamp: minTimeStamp,
				max_timestamp: maxTimeStamp
			}, function(err, medias, pagination, limit) {
				for (var i = 0; i < medias.length; i++) {
					//console.log(medias[0]);
					stream.push({
						time: parseInt(medias[i].create_time, 10),
						html: '<div class="col-xs-12 col-md-2"><img src=' + medias[i].images.standard_resolution.url + '  class="panel img-responsive" alt="Responsive image"></div>'
					})
					//console.log(medias[0].images.standard_resolution.url);
				}

				var returnObj = {
					stream: stream
				};

				res.render('test2.ejs', {
					returnObj: returnObj
				});
			});
		});

		// insta.tag_search('outsidelands', function(err, result, limit) {
		// 	console.log(result);
		// });
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/test',
			failureRedirect: '/'
		}));

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: 'email'
	}));

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