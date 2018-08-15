const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;
const db = require('../models').index;

router.get('/all_loans', (req, res, next) => {
	// This route displays all loans in the library.db.  It needs the `loans` to be plural in order to work properly!
	// Loan.findAll().then(loans => {
		Loan.findAll({
			include: [
				{
					model: Patron,
					// as: 'id',
				}
			]
		}).then(loans => {
			res.render('all_loans', {
				loans: loans,
				patrons: Patron,
				books: Book,
				title: 'Loans'
			});
			console.log('-----------------------------------------------> ', loans[0]);
		});
});

router.get('/new_loan', (req, res, next) => {
	// This route displays the 'new_loan' page & allows a user to add a new loan to the library.db
	Loan.findAll().then(loans => {
		res.render('new_loan', {
			loans: Loan.build(req.body),
			books: Book.build(req.body),
			patrons: Patron.build(req.body),
			title: 'New Loan',
		});
		console.log('/NEW_LOAN-----------------------------------------------> ', books);
	});
});

router.post('/new_loan', (req, res, next) => {
	/* POST, create a new loan in the library.db */
	Loan.create(req.body).then(() => {
		res.redirect('/loans/all_loans');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			res.render('new_loan', {
				loan: Loan.build(req.body),
				title: 'New Loan',
				button_text: 'Create New Loan',
				errors: error.errors
			});
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/overdue_loans', (req, res, next) => {
	res.render('overdue_loans');
});

router.get('/checked_loans', (req, res, next) => {
	res.render('checked_loans');
});

router.get('/return_book', (req, res, next) => {
	res.render('return_book');
});



module.exports = router;
