/**
 * Genre Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare Schema
const GenreSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	movies: {
		type: Schema.Types.ObjectId,
		ref: 'Movie',
	}
});

// Declare Model
const Genre = mongoose.model('Genre', GenreSchema); // den kommer att skapa collection: "movies" automatiskt baserat på vårt modelnamn aka pluralversionen.

// Export Model
module.exports = Genre;
