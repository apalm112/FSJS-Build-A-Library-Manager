const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
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
	Book.findAll({ order: [[ 'createdAt', 'DESC' ]]}).save().then(books => {
		res.render('index', {books: books, title: 'Loobrary Manuhger oh wow'});
		console.log('router.get: REQ BODY:************************************** ', req);
	});
});

// TODO: not getting a req.body Object.  Fix that.
/* POST, create a new book in the library.db */
/* POST create article. */
router.post('/', (req, res, next) => {
	Book.create(req.body).then((book) => {
		res.redirect('/library/all_books');
		console.log('router.post: REQ BODY:************************************** ', req.body);
	});
});

router.get('/all_books', (req, res, next) => {
	res.render('all_books', {title: 'Books'});
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

router.get('/overdue_books', (req, res, next) => {
	res.render('overdue_books');
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
