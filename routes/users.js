var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


/* GET users listing. */
router.get('/', function(req, res, next) {
	Book.findAll({ order: [[ 'title' ]]}).then(books => {
		console.log('books ---------> :', books[0].title);
	});
});

module.exports = router;
