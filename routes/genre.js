/**
 * Genre routes
 */

const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre_controller');

/* Get all movies */
router.get('/', genreController.index);

/* Get a movie */
router.get('/:genreId', genreController.show);

/* Create a new movie */
router.post('/', genreController.store);

/* Update a movie */
router.put('/:genreId', genreController.update);

/* Delete a movie */
router.delete('/:genreId', genreController.destroy);

module.exports = router;
