var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
// TODO Fix this route so it only displays when it matches the URL path!
router.get('/', (req, res, next) => {
	res.render('index', {title: 'Library Manager'});
});

router.get('/all_books', (req, res, next) => {
	res.render('all_books');
});

router.get('/new_book', (req, res, next) => {
	res.render('new_book');
});

router.get('/new_patron', (req, res, next) => {
	res.render('new_patron');
});

router.get('/all_patrons', (req, res, next) => {
	res.render('all_patrons');
});

router.get('/patron_details', (req, res, next) => {
	res.render('patron_details');
});

router.get('/new_loan', (req, res, next) => {
	res.render('new_loan');
});

router.get('/all_loans', (req, res, next) => {
	res.render('all_loans');
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


/*
router.get('/', function(req, res, next) {
	Book.findAll({ order: [[ 'title' ]]}).then(books => {
		console.log('books ---------> :', books[0].title);
	});
});
*/

module.exports = router;
