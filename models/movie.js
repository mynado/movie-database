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
	},
	runtime: {
		type: Number,
		default: null,
	},
	releaseDate: {
		type: Date,
		default: Date.now(),
	},
	certification: String,
});

// Declare Model
const Movie = mongoose.model('Movie', MovieSchema); // den kommer att skapa collection: "movies" automatiskt baserat på vårt modelnamn aka pluralversionen.

// Export Model
module.exports = Movie;
