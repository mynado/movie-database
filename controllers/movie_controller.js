/**
 * Movie Controller
 */

const models = require('../models');

/**
 * Get all movies
 * GET /
 */
const index = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not implemented',
	});
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
