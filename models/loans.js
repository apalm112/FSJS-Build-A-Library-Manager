'use strict';

module.exports = (sequelize, DataTypes) => {
	const loans = sequelize.define('loans', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
/*		book_id: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					msg: 'Book ID is required!'
				}
			}
		},
		patron_id: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					msg: 'Patron ID is required!'
				}
			}
		},*/
		loaned_on: {
			type: DataTypes.DATE,
			validate: {
				notEmpty: {
					msg: 'Loan Date is required!'
				}
			}
		},
		return_by: {
			type: DataTypes.DATE,
			validate: {
				notEmpty: {
					msg: 'Return By Date is required!'
				}
			}
		},
		returned_on: {
			type: DataTypes.DATE,
		},
	}, {
		timestamps: false
	});
	loans.associate = function(models) {
		// associations can be defined here
		loans.belongsTo(models.books);
		loans.belongsTo(models.patrons);
	};
	return loans;
};
