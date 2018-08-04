const express = require('express');
const router = express.Router();
const Book = require('../models').books;

/* GET home page. */
/*router.get('/', (req, res, next) => {
	res.render('index', {title: 'Library Manager'});
});*/

// TODO: Wire up the library.db to display data in the Pug templates.  So far it is Not working.
// 		*** See the working example in /home/sofa_king/Team_Treehouse/Projects/Project10LearningSQL/sqlRound2/routes/articles.js
// 		** it logs out the correct article item from the development.db !!!!!!!!!!!!!
// 		*** BASICALLY, WAT I NEED IS TO BE ABLE TO ACCESS TEH LIBRARY.DB IN THE CONSOLE, THEN CAN DISPLAY THE DATA.
router.get('/', (req, res, next) => {
	Book.findAll().then(books => {
		res.render('index', {title: 'Library Manager'});
		console.log('books --------------------------------------> :', books);
	});
});

/* POST, create a new book in the library.db */
// router.post('/', (req, res, next) => {
// 	Book.create(req.body).then(function (book) {
// 		res.redirect('/');
// 	});
// });



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

module.exports = router;
