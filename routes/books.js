const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;

router.get('/new_book', (req, res, next) => {
	res.render('new_book', {title: 'New Book'});
});

/* POST, create a new book in the library.db */
router.post('/new_book', (req, res, next) => {
	Book.create(req.body).then((book) => {
		res.redirect('/books/all_books');
	}).catch((error) => {
		if(error.name === 'SequelizeValidationError') {
			res.render('new_book', {
				book: Book.build(req.body),
				title: 'New Book No Erros This Time!',
				errors: error.errors
			})
		} else {
			throw error;
		}
	}).catch((error) => {
		res.sendStatus(500, error);
	});
});
// });

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
		console.log('router.get ---> /overdue_books --> loans[0].title: ', loans);
		// console.log('router.get: loans.title: ************************************** ', loans.title);
	});
});


router.get('/checked_books', (req, res, next) => {
	res.render('checked_books');
});


router.get('/book_detail', (req, res, next) => {
	res.render('book_detail');
});

module.exports = router;
