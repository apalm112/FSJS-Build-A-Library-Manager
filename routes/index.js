const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

/*const sequelize = new Sequelize('library.db', 'dog', 'h', {
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
});*/

/*sequelize.authenticate().then(() => {
	console.log('*** Connection has been established successfully. ***');
	// console.log('BOOK:  ', Book);
}).catch(err => {
		console.error('Unable to connect ot the database: ', err);
});*/

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Library Manager, eh' });
});

















module.exports = router;
