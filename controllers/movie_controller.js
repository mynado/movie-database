/**
 * Movie Controller
 */

const debug = require('debug')('08-movie-database:movie_controller')
const models = require('../models');

/**
 * Get all movies
 * GET /
 */
const index = async (req, res) => {
	try {
		const movies = await models.Movie.find();
		return res.status(200).send({
			status: 'success',
			data: {
				movies,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to get all movies.'
		});
	}
}

/**
 * Search for movies
 *
 */
const search = async (req, res) => {
	try {
		const query = req.query.q;
		const regExQuery = new RegExp(query, 'i')

		// search for query in movie
		const movie = await models.Movie.find({
			$or: [
				{ title: regExQuery },
				{ plot: regExQuery },
				{ original_title: regExQuery },
				{ plot_keywords: regExQuery },
			]
		})

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		return res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}

/**
 * Get a specific movie
 * GET /:movie
 */
const show = async (req, res) => {
	try {
		const movie = await models.Movie.findOne(getMovieFilter(req.params.movie))
			.populate('actors', 'name')
			.populate('director', 'name')
			.populate('genres');

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		return res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}

/**
 * Create a new movie
 * POST /
 */
const store = async (req, res) => {
	console.log('incoming new movie data', req.body);
	try {
		const movie = await new models.Movie(req.body).save();

		debug('new movie created');

		return res.status(201).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}

/**
 * Update a movie
 * PUT /:movie
 */
const update = async (req, res) => {
	try {
		const movie = await models.Movie.findOneAndUpdate(getMovieFilter(req.params.movie), req.body, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		return res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}

/**
 * Delete a movie
 * DELETE /:movie
 */
const destroy = async (req, res) => {
	try {
		const movie = await models.Movie.findOneAndRemove(getMovieFilter(req.params.movie));

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		return res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}
/**
 * Add actors to a movie
 *
 * POST /:movie/actors
 * {
 * 		"people": ["5ed4d1be4b49383cfa41f646"],
 * }
 */
const addActors = async (req, res) => {
	try {
		const people = req.body.people;
		const data = {
			$push: {
				actors: people,
			}
		}
		const movie = await models.Movie.findOneAndUpdate(getMovieFilter(req.params.movie), data, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		return res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}

/**
 * Remove an actor from a movie
 *
 * DELETE /:movie/actors/:personId
 */
const removeActor = async (req, res) => {
	try {
		const personId = req.params.personId;
		const data = {
			$pull: {
				actors: personId,
			}
		}
		const movie = await models.Movie.findOneAndUpdate(getMovieFilter(req.params.movie), data, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		return res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}

/**
 * Get movie filter
 *
 * if `movie` is a hexadecimal string of exactly 24 charachters,
 * then search the `_id` field
 * otherwise, assume `movie` contains a slug and search the
 * `slug` attribute
 */
const getMovieFilter = movie => {
	return (/^[0-9a-fA-F]{24}$/.test(movie))
		? { _id: movie }
		: { slug: movie };
}


module.exports = {
	index,
	search,
	show,
	store,
	update,
	destroy,
	addActors,
	removeActor,
}
