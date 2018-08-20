'use strict';

module.exports = (sequelize, DataTypes) => {
	const loans = sequelize.define('loans', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		book_id: {
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
		},
		loaned_on: {
			type: DataTypes.DATE,
			validate: {
				notEmpty: {
					msg: 'Loan Date is required!'
				},
				isDate: true,
			}
		},
		return_by: {
			type: DataTypes.DATE,
			validate: {
				notEmpty: {
					msg: 'Return By Date is required!'
				},
				isDate: true,
			}
		},
		returned_on: {
			type: DataTypes.DATE,
			isDate: true,
		},
	}, {
		timestamps: false,
		/* Foreign keys:
			By default the foreign key for a `belongsTo` relation will be generated from the target model name and the target primary key name.
			The default casing is camelCase however if the source model is configured with `underscored: true` the foreignKey will be snake_case.
			*/
		underscored: true
	});
	loans.associate = function(models) {
		// associations can be defined here
		loans.hasMany(models.patrons, { foreignKey : 'id' });
		loans.hasMany(models.books, { foreignKey : 'id' });
		// loans.belongsTo(models.books);
		// ,  { as: 'book_id' }
		// loans.belongsTo(models.patrons, { as: 'patron_id' });
	};
	return loans;
};
