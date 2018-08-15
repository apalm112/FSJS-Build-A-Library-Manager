'use strict';

module.exports = (sequelize, DataTypes) => {
	const books = sequelize.define('books', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
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
		timestamps: false
	});
	books.associate = function(models) {
		// associations can be defined here
		// books.hasOne(models.loans);
	};
	return books;
};
