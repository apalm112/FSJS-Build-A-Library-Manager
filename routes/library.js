const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;

const sequelize = new Sequelize('library.db', 'dog', 'h', {
	host: 'localhost',
	dialect: 'sqlite',
	define: {
		freezeTableName: true,
		timestamps: false
	},
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	storage: 'library.db'
});

sequelize.authenticate().then(() => {
	console.log('*** Connection has been established successfully. ***');
	console.log('BOOK:  ', Book);
}).catch(err => {
		console.error('Unable to connect ot the database: ', err);
});

/* GET books listing. */
router.get('/', (req, res, next) => {
	Book.findAll({ order: [[ 'createdAt', 'DESC' ]]}).then(books => {
		res.render('index', {books: books, title: 'Loobrary Manuhger oh wow'});
		// console.log('router.get: books.title: ************************************** ', books.title);
	});
});

// TODO: not getting a req.body Object.  Fix that.
/* POST, create a new book in the library.db */
/* POST create article. */
router.post('/', (req, res, next) => {
	Book.create(req.body).then((book) => {
		res.redirect('/library/all_books');
		// console.log('router.post: book.title BODY:************************************** ', book.title);
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
		console.log('router.get ---> /overdue_books --> loans[0].title: ', loans);
		// console.log('router.get: loans.title: ************************************** ', loans.title);
	});
});

router.get('/new_book', (req, res, next) => {
	res.render('new_book');
});

router.get('/new_patron', (req, res, next) => {
	res.render('new_patron');
});

router.get('/all_patrons', (req, res, next) => {
	res.render('all_patrons', {title: 'Patrons'});
});

router.get('/patron_details', (req, res, next) => {
	res.render('patron_details');
});

router.get('/new_loan', (req, res, next) => {
	res.render('new_loan');
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

router.get('/book_detail', (req, res, next) => {
	res.render('book_detail');
});

router.get('/return_book', (req, res, next) => {
	res.render('return_book');
});

router.get('/checked_books', (req, res, next) => {
	res.render('checked_books');
});



module.exports = router;
