/**
 * Movie Model
 */

const mongoose = require('mongoose');

// Declare Schema
const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	original_title: {
		type: String,
		trim: true,
	},
	poster: {
		type: String,
		trim: true,
	},
	plot: {
		type: String,
		trim: true,
	},
	plot_keywords: [
		{
			type: String,
			trim: true,
			lowercase: true,
		}
	],
	runtime: {
		type: Number,
		default: null,
		//min: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Just because you thought the movie was bad, it should not have a negative runtime')
			}
		}
	},
	release_date: {
		type: Date,
		default: Date.now(),
	},
	tagline: {
		type: String,
		default: null,
	},
	certification: String,
});

// Declare Model
const Movie = mongoose.model('Movie', MovieSchema); // den kommer att skapa collection: "movies" automatiskt baserat på vårt modelnamn aka pluralversionen.

// Export Model
module.exports = Movie;
