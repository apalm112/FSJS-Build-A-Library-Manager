const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;

router.get('/new_book', (req, res, next) => {
	res.render('new_book', {
		book: Book.build(req.body),
		title: 'New Book',
		button_text: 'Create New Book',
	});
});

/* POST, create a new book in the library.db */
router.post('/new_book', (req, res, next) => {
	Book.create(req.body).then(() => {
		res.redirect('/books/all_books');
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

router.get('/all_books', (req, res, next) => {
	Book.findAll().then(books => {
		res.render('all_books', {
			books: books,
			title: 'Books'
		});
		// console.log('router.get ---> /all_books --> books[0].title: ', books[0].title);
		// console.log('router.get: books.title: ************************************** ', books.title);
		// 			#{book.id.title}
	});
});

router.get('/overdue_books', (req, res, next) => {
	//- 'books?filter=overdue'
	//- SELECT * from BOOKS WHERE BOOK.ID in LOANS WHERE return_by [Op.gt]: today
	const today = (new Date()).toISOString().slice(0,10);
	Loan.findAll({
		where: {
			return_by: {
				[Op.gt]: today,
			//	id: true,
			}
		}
	}).then(loans => {
		res.render('overdue_books', {
			loans: loans,
			title: 'Overdue Books'
		});
		// console.log('router.get ---> /overdue_books --> loans[0].title: ', loans);
		// console.log('router.get: loans.title: ************************************** ', loans.title);
	});
});

// GET individual Book Details, when an individual book link is clicked on the `/books/all_books` page, the user is redirected by this route to the `/books/book_detail/:id/edit` page.
router.get('/book_detail/:id/edit', (req, res, next) => {
	// Get the book_id of the book clicked on in all_books
	Book.findById(req.params.id).then(books => {
		// get that books data & render it to book_detail
		if(books) {
			res.render('book_detail', {
				book: books,
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

/* PUT, the `books/book_detail/:id/edit` page,
				update a book in the library.db */
router.put('/:id', (req, res, next) => {
	Book.findById(req.params.id).then((books) => {
		if(books) {
			return books.update(req.body);
		} else {
			res.sendStatus(404);
		}
	}).then((book) =>  {
		res.redirect('/books/all_books');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			const book = Book.build(req.body);
			book.id = req.params.id;
			res.render('book_detail', {
				book: book,
				title: 'Book:' + book.title,
				button_text: 'Update',
				errors: error.errors
			});
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});

router.get('/checked_books', (req, res, next) => {
	res.render('checked_books');
});

module.exports = router;
