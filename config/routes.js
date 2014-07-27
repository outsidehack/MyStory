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
			minTimeStamp = new Date("2014-08-08").getTime() / 1000,
			maxTimeStamp = new Date("2014-08-12").getTime() / 1000;

		// T.get('trends/place', {
		// 	id: '23424977'
		// }, function(err, data, response) {
		// 	// loops through, rendering data[0].trends[i]
		// 	trendsArray = data[0].trends;
		// 	console.log(data[0].trends[0]);
		// });

		// Not working :( :
		
		// T.get('statuses/user_timeline', {
			
		// }, function(err, data, response) {
		// 	for (var i = 0; i < data.length; i++) {
		// 		var timeStamp = new Date(data[i].created_at).getTime() / 1000;

		// 		data[i].entities.hashtags;

		// 		if (timeStamp < maxTimeStamp && timeStamp > minTimeStamp) {
		// 			T.get('statuses/oembed', {
		// 				id: data[i].id_str
		// 			}, function(err, tweetData, response) {
		// 				console.log(tweetData.html);
		// 			});
		// 		}
		// 	}
		// });

		// twit.get('/statuses/user_timeline.json', {
		// 	include_entities: true
		// }, function(data) {
		// 	for (var i = 0; i < data.length; i++) {
		// 		console.log(data[i].entities);
		// 	}
		// });

		// twit.get('/statuses/show.json', {
		// 	id: 493360831061438466,
		// 	include_entities: true
		// }, function(data) {
		// 	console.log(data)
		// });

		// twit.get('/trends/places.json', {
		// 	id: 1
		// }, function(data) {
		// 	console.log(data);
		// });

		var insta = instagram.instagram();
		insta.use({
			access_token: req.user.instagram.token
		});

		insta.user_media_recent(req.user.instagram.id, {
			min_timestamp: new Date("2013-08-08").getTime() / 1000,
			max_timestamp: new Date("2014-08-12").getTime() / 1000
		}, function(err, medias, pagination, limit) {
			console.log(medias);
			// console.log(medias[0].images.standard_resolution.url);
		});
		// insta.tag_search('outsidelands', function(err, result, limit) {
		// 	//console.log(result);
		// });

		var returnObj = {
			trendsArray: trendsArray
		};

		res.render('test2.ejs', { returnObj: returnObj});
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