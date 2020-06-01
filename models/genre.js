/**
 * Genre Model
 */

const mongoose = require('mongoose');

// Declare Schema
const GenreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
});

// Declare Model
const Genre = mongoose.model('Genre', GenreSchema); // den kommer att skapa collection: "movies" automatiskt baserat på vårt modelnamn aka pluralversionen.

// Export Model
module.exports = Genre;
