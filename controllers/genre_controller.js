/**
 * Genre Controller
 */

const models = require('../models');

/**
 * Get all genre
 * GET /
 */
const index = async (req, res) => {
	try {
		const genres = await models.Genre.find();

		res.status(200).send({
			status: 'success',
			data: {
				genres,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to get all genres.'
		});
		throw error;
	}
}

/**
 * Get a specific genre
 * GET /:genreId
 */
const show = async (req, res) => {
	try {
		const genre = await models.Genre.findById(req.params.genreId);

		if (!genre) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				genre,
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
 * Create a new genre
 * POST /
 */
const store = async (req, res) => {
	console.log('incoming new genre data', req.body);
	try {
		const genre = await new models.Genre(req.body).save();

		res.status(201).send({
			status: 'success',
			data: {
				genre,
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
 * Update a genre
 * PUT /:genreId
 */
const update = async (req, res) => {
	try {
		const genre = await models.Genre.findByIdAndUpdate(req.params.genreId, req.body, { new: true });

		if (!genre) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				genre,
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
 * Delete a genre
 * DELETE /:genreId
 */
const destroy = async (req, res) => {
	try {
		const genre = await models.Genre.findByIdAndRemove(req.params.genreId);

		if (!genre) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				genre,
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
}
