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
			type: DataTypes.DATEONLY,
			validate: {
				notEmpty: {
					msg: 'Loan Date is required!'
				},
				isDate: {
					msg: 'Loaned On Date Must Be a Valid Date'
				}
			}
		},
		return_by: {
			type: DataTypes.DATEONLY,
			validate: {
				notEmpty: {
					msg: 'Return By Date is required!'
				},
				isDate:  {
					msg: 'Return By Date Must Be a Valid Date'
				}
			}
		},
		returned_on: {
			type: DataTypes.DATEONLY,
			validate: {
				notEmpty: {
					msg: 'Returned on Date Must Be Entered.'
				},
				isDate:  {
					msg: 'Returned On Date Must Be a Valid Date'
				}
			},
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
		loans.belongsTo(models.books, { foreignKey : 'book_id' });
		loans.belongsTo(models.patrons, { foreignKey: 'patron_id' });
	};
	return loans;
};
