const { Schema, model } = require('mongoose')
const recipeSchema = require('./recipe-model')

const userSchema = Schema({
	name: String,
	password: String,
	email: String,

	recipes: [recipeSchema]
});

const UserModel = model('user', userSchema, 'users');

module.exports = UserModel; 