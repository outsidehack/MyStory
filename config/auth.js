// config/auth.js

module.exports = {

	'facebookAuth': {
		'clientID': '566276443484535',
		'clientSecret': 'c5a50fcf844d272da3e98148665b2a74',
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth': {
		'consumerKey': 'hNTeruX9tfcT1HARiB0uhjYZh',
		'consumerSecret': 'H5khJPeK3PoGlJM3USRxgThwtawgQxIDRuBoLaGnlg3IQ74osF',
		'callbackURL': 'http://localhost:8080/auth/twitter/callback'
	},

	'instagramAuth': {
		'clientID': 'ce2cb7e61c214a7d9abb38c677c736dc',
		'clientSecret': '5a8f7d0fe8fb42c58c472f70c74f1d29',
		'callbackURL': 'http://localhost:8080/auth/instagram/callback'
	}
};