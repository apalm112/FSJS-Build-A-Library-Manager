var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
	Book.findAll({ order: [[ 'title' ]]}).then(books => {
		console.log('books ---------> :', books[0].title);
	});
});

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




module.exports = router;
