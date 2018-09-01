const express = require('express');
const router = express.Router();

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;

router.get('/patrons', (req, res, next) => {
	// This route renders the 'patrons' page & lists all the patrons in the library.db file.
	Patron.findAll().then(patrons => {
		res.render('patrons', {
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
	// This route checks for a valid new patron submission, adds the new patron to the patrons table & then redirects to the 'patrons' page with the newest patron included.
	Patron.create(req.body).then(() => {
		res.redirect('/patrons');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			res.render('new_patron', {
				patron: Patron.build(req.body),
				title: 'New Patron',
				button_text: 'Create New Patron',
				errors: error.errors
			});
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/patron_detail/:id/edit', (req, res, next) => {
	// Change to Patron.findAll() in order to fix the bug of a new patron link click to the patrons detail page not working.
	Patron.findAll({
		where: { id: req.params.id },
		include: [ { model: Loan, where: { patron_id: req.params.id } },
		// { model: Book }
		]
	}).then((patrons) => {
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', patrons[0].first_name, patrons[0].loans[0]);
		res.render('patron_detail', {
			loans: Loan,
			patron: patrons,
			books: Book,
			button_text: 'Update',
		});
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});
	// Original working code:
/*	Loan.findAll({
		where: { patron_id: req.params.id },
		include: [ { model: Patron, where: { id: req.params.id } },
		{ model: Book } ]
	}).then((loans) => {
		res.render('patron_detail', {
			loans: loans,
			patron: Patron,
			books: Book,
			button_text: 'Update',
		});
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});*/

router.put('/patron_detail/:id', (req, res, next) => {
	// Update a Patrons data in the patrons table.
	Patron.findById(req.params.id).then((patrons) => {
		return patrons.update(req.body);
	}).then((patrons) => {
		res.redirect('/patrons');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			Loan.findAll({
				where: { patron_id: req.params.id },
				include: [ { model: Patron, where: { id: req.params.id } },
				{ model: Book } ]
			}).then((loans) => {
				res.render('patron_detail', {
					loans: loans,
					patron: Patron,
					books: Book,
					button_text: 'Update',
					errors: error.errors
				});
			}).catch((error) => {
				res.sendStatus(500, error);
			});
		}
	});
});

module.exports = router;
