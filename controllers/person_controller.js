/**
 * Person Controller
 */

const debug = require('debug')('08-movie-database:person_controller')
const models = require('../models');

/**
 * Get all person
 * GET /
 */
const index = async (req, res) => {
	try {
		const persons = await models.Person.find();

		res.status(200).send({
			status: 'success',
			data: {
				persons,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to get all persons.'
		});
		throw error;
	}
}

/**
 * Get a specific person
 * GET /:personId
 */
const show = async (req, res) => {
	try {
		const person = await models.Person.findById(req.params.personId);

		if (!person) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				person,
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
 * Create a new person
 * POST /
 */
const store = async (req, res) => {
	console.log('incoming new person data', req.body);
	try {
		const person = await new models.Person(req.body).save();

		res.status(201).send({
			status: 'success',
			data: {
				person,
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
 * Update a person
 * PUT /:personId
 */
const update = async (req, res) => {
	try {
		const person = await models.Person.findByIdAndUpdate(req.params.personId, req.body, { new: true });

		if (!person) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				person,
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
 * Delete a person
 * DELETE /:personId
 */
const destroy = async (req, res) => {
	try {
		const person = await models.Person.findByIdAndRemove(req.params.personId);

		if (!person) {
			res.sendStatus(404);
			return;
		}

		res.status(200).send({
			status: 'success',
			data: {
				person,
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
