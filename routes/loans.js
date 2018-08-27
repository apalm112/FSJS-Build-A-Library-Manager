const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const dayjs = require('dayjs');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;
const Op = Sequelize.Op;

const today = dayjs().format().slice(0,10);
const returned_on = dayjs().format().slice(0,10);

router.get('/loans', (req, res, next) => {
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
		res.render('loans', {
			loans: loans,
			title: 'Loans'
		});
		// console.log('-----------------------------------------------> ', loans[0]);
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
		res.redirect('/loans');
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
	// const today = dayjs().format().slice(0,10);
	Loan.findAll({
		where: {
			// This code cheking for overdue loans may need some tweaking, it is Not showing all of the overdue loans.  Could be to a dulplicate loan in the loans table.  Problem may be solved w/ removing/not allowing dulplicate loans.
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
	Loan.findAll({
		where: {
			returned_on: null,
		},
		include: [{ all: true,	nested: true }]})
		.then((loans) => {
			res.render('checked_loans', {
				loans: loans,
				title: 'Checked Out Books',
			});
		});
});

router.get('/return_book/:id', (req, res, next) => {
	// const returned_on = dayjs().format().slice(0,10);
	Loan.findById(req.params.id).then(loans => {
		Patron.findById(loans.patron_id).then( (patrons) => {
			Book.findById(loans.book_id).then( (books) => {
				// console.log('GET---------------------------', req.body);
				res.render('return_book', {
					loans: loans,
					patrons: patrons,
					books: books,
					returned_on: returned_on,
					title:  'Patron: Return Book',
				});
			}).catch((error) => {
				res.sendStatus(500, error);
			});
		});
	});
});

router.put('/:id', (req, res, next) => {
	Loan.findById(req.params.id).then((loans) => {
		if(loans) {
			// console.log('/:id---------------------------', req, loans);
			return loans.update(req.body);
		} else {
			res.send(404);
		}
	}).then((loans) => {
		res.redirect('/loans');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {

			Loan.findById(req.params.id).then(loans => {
				Patron.findById(loans.patron_id).then( (patrons) => {
					Book.findById(loans.book_id).then( (books) => {
						res.render('return_book', {
							loans: loans,
							patrons: patrons,
							books: books,
							returned_on: returned_on,
							title:  'Patron: Return Book',
							errors: error.errors,
						});
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

module.exports = router;
