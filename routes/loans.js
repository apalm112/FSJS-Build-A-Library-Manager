const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;


router.get('/new_loan', (req, res, next) => {
	res.render('new_loan');
});

/* POST, create a new loan in the library.db */
router.post('/new_loan', (req, res, next) => {
	Loan.create(req.body).then((loan) => {
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


router.get('/all_loans', (req, res, next) => {
	res.render('all_loans', {title: 'Loans'});
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
