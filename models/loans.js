'use strict';
module.exports = (sequelize, DataTypes) => {
	const loans = sequelize.define('loans', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		book_id: {
			type: DataTypes.INTEGER,
		},
		patron_id: {
			type: DataTypes.INTEGER,
		},
		loaned_on: {
			type: DataTypes.DATE,
		},
		return_by: {
			type: DataTypes.DATE,
		},
		returned_on: {
			type: DataTypes.DATE,
		},
	}, {});
	loans.associate = function(models) {
		// associations can be defined here
	};
	return loans;
};
