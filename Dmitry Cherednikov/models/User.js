const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('Joi');
const { key } = require('../config');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	catched: {
		type: Array,
		default: [],
	},
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
		},
		key
	);
	return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(4)
			.max(15)
			.required(),
		password: Joi.string()
			.min(6)
			.max(15)
			.required(),
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;