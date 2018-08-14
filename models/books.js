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
		},
	}, {
		timestamps: false
	});
	books.associate = function(models) {
		// associations can be defined here
		books.hasOne(models.loans);
	};
	// Instance Methods
	// Helper Method below.
	/*books.prototype.publishedAt = function() {
		return dateFormat(this.createdAt, 'dddd, mmmm dS, yyyy, h:MM TT');
	};*/
	return books;
};
