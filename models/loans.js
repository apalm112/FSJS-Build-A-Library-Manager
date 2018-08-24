'use strict';
module.exports = (sequelize, DataTypes) => {
	const loans = sequelize.define('loans', {
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
		timestamps: false,
		underscored: true
	});
	loans.associate = function(models) {
		// associations can be defined here
	};
	return loans;
};
