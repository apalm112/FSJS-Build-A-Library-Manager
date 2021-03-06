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

const loaned_on = dayjs().format().slice(0,10);
const dateLibrary = dayjs().add(1, 'week');
const return_by = dateLibrary.format().slice(0,10);

router.get('/loans', (req, res, next) => {
	// This route displays all loans in the library.db.  It needs the `loans` to be plural in order to work properly!
	Loan.findAll({
		include: [{	model: Book	}, {	model: Patron	}	]
	}).then(loans => {
		// console.log(JSON.stringify(loans));
		res.render('loans', {
			loans: loans,
			title: 'Loans'
		});
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
	const titleToFindId = req.body.book_id;

	const getPatronId = req.body.patron_id;
	const num = getPatronId.search(' ');
	const getFirst_name = getPatronId.slice(0, num);
	const getLast_name = getPatronId.slice(num+1);

	// Take the selected title from the new loan form & find the corresponding book.id, then store that value in a variable.
	Book.findAll({ where: { title: titleToFindId }}).then((book) => {
		const newLoanBookId = book[0].dataValues.id;
		Patron.findAll({
			where: {
				first_name: getFirst_name,
				last_name: getLast_name
			}}).then((patron) => {
				const newPatronId = patron[0].dataValues.id;
				req.body.book_id = newLoanBookId;
				req.body.patron_id = newPatronId;

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
	});
});

router.get('/overdue_loans', (req, res, next) => {
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

		Book.findAll({ where: { id: [...findAllBookIds] } }).then((books) => {
			res.render('overdue_loans', {
				loans: loans,
				books: books,
				title: 'Overdue Loans'
			});
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
	Loan.findByPk(req.params.id).then(loans => {
		Patron.findByPk(loans.patron_id).then( (patrons) => {
			Book.findByPk(loans.book_id).then( (books) => {
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

router.put('/return_book/:id', (req, res, next) => {
	Loan.findByPk(req.params.id).then((loans) => {
		if(loans) {
			return loans.update(req.body);
		} else {
			res.send(404);
		}
	}).then((loans) => {
		res.redirect('/loans');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {

			Loan.findByPk(req.params.id).then(loans => {
				Patron.findByPk(loans.patron_id).then( (patrons) => {
					Book.findByPk(loans.book_id).then( (books) => {
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
