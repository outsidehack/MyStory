// models/user.js
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},

	twitter: {
		id: String,
		token: String,
		email: String,
		name: String
	},

	instagram: {
		id: String,
		token: String,
		email: String,
		name: String
	}

});
