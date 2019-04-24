const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const dayjs = require('dayjs');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;

router.get('/new_book', (req, res, next) => {
	/* Render the new book form. */
	console.log(req.params.id);
	res.render('new_book', {
		book: Book.build(req.body),
		title: 'New Book',
		button_text: 'Create New Book',
	});
});

router.post('/new_book', (req, res, next) => {
	/* POST, create a new book in the library.db, validates the user input. */
	Book.create(req.body).then(() => {
		res.redirect('/books');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			res.render('new_book', {
				book: Book.build(req.body),
				title: 'New Book',
				button_text: 'Create New Book',
				errors: error.errors
			});
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/books', (req, res, next) => {
	/* Render the 'books' page, listing all of the books in the database. */
	Book.findAll().then(books => {
		res.render('books', {
			books: books,
			title: 'Books'
		});
	});
});

router.get('/overdue_books', (req, res, next) => {
	/* Render the overdue books page. */
	const today = dayjs().format().slice(0,10);
	Loan.findAll({
		where: {
			return_by: { [Op.lt]: today },
			returned_on: null,
		},
		include: [{
			model: Patron,
			attributes: [ 'id', 'first_name', 'last_name'],
		}]
	}).then((loans) => {
		let findAllBookIds = loans.map((curr, idx, loan) => {
			return loan[idx].book_id;
		});
		Book.findAll({ where: { id: {
			[Op.in]: [...findAllBookIds] }}}).then((books) => {
			res.render('overdue_books', {
				loans: loans,
				books: books,
				title: 'Overdue Books'
			});
			console.log('========================', findAllBookIds);
			console.log('========================books', books);
		});
	});
});

router.get('/book_detail/:id/edit', (req, res, next) => {
	// GET individual Book Details, when an individual book link is clicked on the `/books` page, the user is redirected by this route to the `/book_detail/:id/edit` page.
	// Get the book_id of the book clicked on in books
	Book.findByPk(req.params.id).then(books => {
		// get that books data & render it to book_detail
		Loan.findAll({ where: { book_id: [req.params.id] } }).then((loans) => {
			// Maps over the loans object to get all book_id's in order to dispaly book titles on the patron_detail page.
			let findAllPatronIds = loans.map( (curr, idx, loan) => loan[idx].patron_id );

			Patron.findAll({ where: { id: [findAllPatronIds] } }).then((patrons) => {
				if(books) {
					res.render('book_detail', {
						book: books,
						loans: loans,
						patrons: patrons,
						title: 'Book: ' + books.title,
						button_text: 'Update',
					});
				} else {
					res.sendStatus(404);
				}
			}).catch((error) => {
				res.sendStatus(500, error);
			});
		});
	});
});

router.put('/:id', (req, res, next) => {
	/* PUT, the `books/book_detail/:id/edit` page,
	update/edit a book in the library.db */
	Book.findByPk(req.params.id).then((books) => {
		if(books) {
	// What's happening here is the update() method is returning a Promise, that passes the next value down the .then chain.
			return books.update(req.body);
		} else {
			res.sendStatus(404);
		}
	// Once the update has happened, Then can redirect to the individual article.
	}).then((book) =>  {
		res.redirect('/books');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {

			Book.findByPk(req.params.id).then(book => {
				Loan.findAll({ where: { book_id: [req.params.id] } }).then((loans) => {
					let findAllPatronIds = loans.map( (curr, idx, loan) => loan[idx].patron_id );
					Patron.findAll({ where: { id: [findAllPatronIds] } }).then((patrons) => {

						res.render('book_detail', {
							book: book,
							loans: loans,
							patrons: patrons,
							title: 'Book:' + book.title,
							button_text: 'Update',
							errors: error.errors
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

router.get('/checked_books', (req, res, next) => {
	Loan.findAll({ where: {
		returned_on: null,
	},
		include: [{ all: true, nested: true }]})
		.then((loans) => {
			res.render('checked_books', {
				loans: loans,
				title: 'Checked Out Books'
			});
		});
});

module.exports = router;
