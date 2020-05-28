/**
 * Movie Controller
 */

const models = require('../models');

/**
 * Get all movies
 * GET /
 */
const index = async (req, res) => {
	try {
		//const movie = await new models.Movie(req.body).save();
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
	res.status(405).send({
		status: 'fail',
		message: 'Method not implemented',
	});
}

/**
 * Create a new movie
 * POST /
 */
const store = async (req, res) => {
	console.log('incoming new movie data', req.body);
	try {
		const movie = await new models.Movie(req.body).save();

		res.status(201).send({
			status: 'success',
			data: {
				movie,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to create new movie.'
		});
		throw error;
	}
	res.status(405).send({
		status: 'fail',
		message: 'Method not implemented',
	});
}

/**
 * Update a movie
 * PUT /:movieId
 */
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not implemented',
	});
}

/**
 * Delete a movie
 * DELETE /:movieId
 */
const destroy = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not implemented',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
