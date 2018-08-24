'use strict';

module.exports = (sequelize, DataTypes) => {
	const books = sequelize.define('books', {
		title: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Book Title is required!'
				}
			}
		},
		author: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Author is required!'
				}
			}
		},
		genre: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Book genre is required!'
				}
			}
		},
		first_published: {
			type: DataTypes.INTEGER,
			isDate: true,
		},
	}, {
		timestamps: false,
		underscored: true
	});
	books.associate = function(models) {
		// associations can be defined here
		books.hasMany(models.loans, { foreignKey: 'book_id'	});
	};
	return books;
};
