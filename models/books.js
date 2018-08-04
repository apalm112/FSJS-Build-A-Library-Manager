'use strict';
module.exports = (sequelize, DataTypes) => {
	var books = sequelize.define('books', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		author: {
			type: DataTypes.STRING,
		},
		genre: {
			type: DataTypes.STRING,
		},
		first_published: {
			type: DataTypes.INTEGER,
		},
	}, {});
	books.associate = function(models) {
		// associations can be defined here
	};
	return books;
};
