const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
	title: String,
	description: String,
	ingredients: [String],

	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },

	previousVersions: [{
		title: String,
		description: String,
		ingredients: [String],

		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now },
	}]

})

module.exports = recipeSchema