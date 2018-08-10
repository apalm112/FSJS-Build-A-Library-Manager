const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;


router.get('/new_patron', (req, res, next) => {
	res.render('new_patron');
});

/* POST, create a new patron in the library.db */
router.post('/new_patron', (req, res, next) => {
	Patron.create(req.body).then((patron) => {
		res.redirect('/books/all_patrons');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			res.render('new_patron', {
				patron: Patron.build(req.body),
				title: 'New Patron',
				errors: error.errors
			})
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/all_patrons', (req, res, next) => {
	res.render('all_patrons', {title: 'Patrons'});
});

router.get('/patron_detail', (req, res, next) => {
	res.render('patron_detail');
});


module.exports = router;
