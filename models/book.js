'use strict';

const dateFormat = require('dateformat');

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    // id: DataTypes.INTEGER,
    title: {
			type: DataTypes.STRING,
		},
    author: {
			type: DataTypes.TEXT,
		},
    genre: {
			type: DataTypes.STRING,
		},
    first_published: {
			type: DataTypes.INTEGER,
		},
  });
  Book.associate = function(models) {
    // associations can be defined here
  };
	// Helper Method below.
	Book.prototype.publishedAt = function() {
		return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
	};

	// Helper Method below.
	Book.prototype.shortDescription = function() {
		return this.title.length > 30 ? this.title.substr(0, 30) + "..." : this.title;
	};

  return Book;
};
