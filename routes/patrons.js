const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const Book = require('../models').books;
const Patron = require('../models').patrons;
const Loan = require('../models').loans;


router.get('/new_patron', (req, res, next) => {
	res.render('new_patron');
});

router.get('/all_patrons', (req, res, next) => {
	res.render('all_patrons', {title: 'Patrons'});
});

router.get('/patron_details', (req, res, next) => {
	res.render('patron_details');
});


module.exports = router;
