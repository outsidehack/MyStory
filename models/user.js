// models/user.js
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
		refreshToken: String
	},

	twitter: {
		id: String,
		token: String,
		email: String,
		name: String,
		secret: String
	},

	instagram: {
		id: String,
		token: String,
		username: String,
		name: String,
		refreshToken: String
	}

});

module.exports = mongoose.model('User', userSchema);