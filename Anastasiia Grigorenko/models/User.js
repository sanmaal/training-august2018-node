const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    catched: {
        type: Array,
        default: [],
    }
});

function validateUser(user){
    const schema ={
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,15}$/).required()
    };

    return Joi.validate(user, schema);
}

exports.User = mongoose.model('User', userSchema);
exports.validateUser = validateUser;