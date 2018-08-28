const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Library Manager' });
});

module.exports = router;
