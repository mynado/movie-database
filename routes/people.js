/**
 * Person routes
 */

const express = require('express');
const router = express.Router();
const personController = require('../controllers/person_controller');

/* Get all movies */
router.get('/', personController.index);

/* Get a movie */
router.get('/:personId', personController.show);

/* Create a new movie */
router.post('/', personController.store);

/* Update a movie */
router.put('/:personId', personController.update);

/* Delete a movie */
router.delete('/:personId', personController.destroy);

module.exports = router;
