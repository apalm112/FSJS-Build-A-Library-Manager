'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    // id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.TEXT,
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
