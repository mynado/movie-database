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

		res.status(200).send({
			status: 'success',
			data: {
				movies,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to get all movies.'
		});
		throw error;
	}
}

/**
 * Get a specific movie
 * GET /:movieId
 */
const show = async (req, res) => {
	try {
		const movie = await models.Movie.findById(req.params.movieId)
			.populate('actors', 'name')
			.populate('director', 'name')
			.populate('genres');

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
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

		res.status(201).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

/**
 * Update a movie
 * PUT /:movieId
 */
const update = async (req, res) => {
	try {
		const movie = await models.Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

/**
 * Delete a movie
 * DELETE /:movieId
 */
const destroy = async (req, res) => {
	try {
		const movie = await models.Movie.findByIdAndRemove(req.params.movieId);

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}
/**
 * Add actors to a movie
 *
 * POST /:movieId/actors
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
		const movie = await models.Movie.findByIdAndUpdate(req.params.movieId, data, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

/**
 * Remove an actor from a movie
 *
 * DELETE /:movieId/actors/:personId
 */
const removeActor = async (req, res) => {
	try {
		const personId = req.params.personId;
		const data = {
			$pull: {
				actors: personId,
			}
		}
		const movie = await models.Movie.findByIdAndUpdate(req.params.movieId, data, { new: true });

		if (!movie) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
		throw error;
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
	addActors,
	removeActor,
}
