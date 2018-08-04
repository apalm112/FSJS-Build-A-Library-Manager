'use strict';


module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    // id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
  }, {});
  Loan.associate = function(models) {
    // associations can be defined here
  };
	// Helper Method below.
	Loan.prototype.publishedAt = function() {
		return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
	};

	// Helper Method below.
	/*Loan.prototype.shortDescription = function() {
		return this.body.length > 30 ? this.body.substr(0, 30) + "..." : this.body;
	};
*/
  return Loan;
};
