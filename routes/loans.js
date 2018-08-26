const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const dayjs = require('dayjs');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;
const Op = Sequelize.Op;

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
		// console.log('ALL FUCKING LOANS HERBERT HERE -----------------------------------------------> ', loans[0]);
	});
});

router.get('/new_loan', (req, res, next) => {
	// This route displays the 'new_loan' page & allows a user to add a new loan to the library.db
	const loaned_on = dayjs().format().slice(0,10);
	const dateLibrary = dayjs().add(1, 'week');
	const return_by = dateLibrary.format().slice(0,10);

	Patron.findAll().then( (patrons) => {
		Book.findAll().then( (books) => {
			res.render('new_loan', {
				books: books,
				patrons: patrons,
				loaned_on: loaned_on,
				return_by: return_by,
				title: 'New Loan',
			});
		});
	});
});

router.post('/new_loan', (req, res, next) => {
	/* POST, create a new loan in the library.db */
	const loaned_on = dayjs().format().slice(0,10);
	const dateLibrary = dayjs().add(1, 'week');
	const return_by = dateLibrary.format().slice(0,10);

	Loan.create(req.body).then(() => {
		res.redirect('/loans/all_loans');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			Patron.findAll().then( (patrons) => {
				Book.findAll().then( (books) => {
					res.render('new_loan', {
						books: books,
						patrons: patrons,
						loaned_on: loaned_on,
						return_by: return_by,
						title: 'New Loan',
						errors: error.errors
					});
				});
			});
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/overdue_loans', (req, res, next) => {
	const today = dayjs().format().slice(0,10);
	Loan.findAll({
		where: {
			return_by: {
				[Op.lt]: [today],
			},
			returned_on: null,
		},
		include: [{
			model: Patron,
			attributes: [ 'id', 'first_name', 'last_name' ],
		}],
	}).then( (loans) => {
		let findAllBookIds = loans.map(( curr, idx, loan) => {
			return loan[idx].book_id;
		});

		Book.findAll({ where: { id: [findAllBookIds] } }).then((books) => {
			res.render('overdue_loans', {
				loans: loans,
				books: books,
				title: 'Overdue Loans'
			});
			// console.log(JSON.stringify(books));
			// console.log('-----------------', books[0].title );
			// console.log(findAllBookIds);
		});
	});
});

router.get('/checked_loans', (req, res, next) => {
/////////////////////////////////////////////////////////
// This code block COULD HELP Out w/ this route.
	Loan.findAll({ include: [{ all: true,	nested: true }]})
		.then((loans) => {
			console.log('/NEW_LOAN book_id... -----------------> ',loans[0].book_id);
			console.log('/NEW_LOAN patron_id... -----------------> ', loans[0].patron_id);
			console.log('/NEW_LOAN book... -----------------> ', loans[0].book.title);
			console.log('/NEW_LOAN patron... -----------------> ',  loans[0].patron.first_name, loans[0].patron.last_name);

			res.render('new_loan', {
				loans: loans,
				loaned_on: loaned_on,
				return_by: return_by,
				title: 'New Loan',
			});
		});
		where: {
			id: req.params.id
		}
///////////////////////////////////////////////
	res.render('checked_loans');
});

router.get('/return_book', (req, res, next) => {
	res.render('return_book');
});



module.exports = router;
