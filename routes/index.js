var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('layout', { title: 'Library Manager' });
});

router.get('/book/all_books.pug', function(req, res, next) {
	res.render('all_books.pug');
});

module.exports = router;
