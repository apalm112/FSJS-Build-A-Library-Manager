const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;

router.get('/all_patrons', (req, res, next) => {
	// This route renders the 'all_patrons' page & lists all the patrons in the library.db file.
	Patron.findAll().then(patrons => {
		res.render('all_patrons', {
			patrons: patrons,
			title: 'Patrons',
		});
	});
});

router.get('/new_patron', (req, res, next) => {
	// This route renders the 'new_patron' page.
	res.render('new_patron', {
		patron: Patron.build(req.body),
		title: 'New Patron',
		button_text: 'Create New Patron',
	});
});

router.post('/new_patron', (req, res, next) => {
	/* POST, create a new patron in the library.db */
	// This route checks for a valid new patron submission, adds the new patron to the patrons table & then redirects to the 'all_patrons' page with the newest patron included.
	Patron.create(req.body).then(() => {
		res.redirect('/patrons/all_patrons');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			res.render('new_patron', {
				patron: Patron.build(req.body),
				title: 'New Patron',
				button_text: 'Create New Patron',
				errors: error.errors
			})
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/patron_detail', (req, res, next) => {
	res.render('patron_detail');
});


module.exports = router;
