'use strict';

module.exports = (sequelize, DataTypes) => {
	const books = sequelize.define('books', {
		title: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {	msg: 'Book Title is required!' }
			}
		},
		author: {
			type: DataTypes.STRING,
			validate: {
				not: {
					args: /^([0-9]*)$/,
					msg: 'Valid Author Name is Required.'
				},
			}
		},
		genre: {
			type: DataTypes.STRING,
			validate: {
				not: {
					args: /^([0-9]*)$/,
					msg: 'Valid Book Genre is Required.'
				},
			}
		},
		first_published: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null,
			validate: {
				not: {
					args: ['[a-z]','i'],
					msg: 'Published Date Must Be Integers Only.'
				},
				len: {
					args: [0, 4],
					msg: 'Published Date Must Be Max Four Digits in Length.'
				},
			}
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
