const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'success' });
});

router.use('/movies', require('./movies'));
router.use('/genres', require('./genre'));
router.use('/people', require('./people'))

module.exports = router;
