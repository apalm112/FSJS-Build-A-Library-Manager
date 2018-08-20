const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const dayjs = require('dayjs');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;
const db = require('../models').index;

router.get('/all_loans', (req, res, next) => {
	// This route displays all loans in the library.db.  It needs the `loans` to be plural in order to work properly!
	Loan.findAll({
		include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(loans => {
		// console.log(JSON.stringify(loans));
		res.render('all_loans', {
			loans: loans,
			title: 'Loans'
		});
		console.log('ALL FUCKING LOANS HERBERT HERE-----------------------------------------------> ', loans[0].dataValues.books[0].title, loans[0].dataValues.books[0].author, loans[0].dataValues.books[0].genre);
		//
	});
});

router.get('/new_loan', (req, res, next) => {
	// This route displays the 'new_loan' page & allows a user to add a new loan to the library.db
	const today = dayjs().format().slice(0,10);
	const dateLibrary = dayjs().add(7, 'day');
	const returnBy = dateLibrary.format().slice(0,10);
	Book.findAll({
		include: [
			{
				model: Patron
			}
		]
	}).then(books => {
		res.render('new_loan', {
			books: books,
			today: today,
			returnBy: returnBy,
			title: 'New Loan',
		});
		console.log('WORKING OVER HERE-----------------------------------------------> ', books[0]);
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
	console.log(today);
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
