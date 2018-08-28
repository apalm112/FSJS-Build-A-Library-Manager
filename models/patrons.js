'use strict';

module.exports = (sequelize, DataTypes) => {
	const patrons = sequelize.define('patrons', {
		first_name: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron First Name is required!'
				},
				isAlpha: {
					msg: 'First Name field must contain only letters.'
				}
			}
		},
		last_name: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron Last Name is required!'
				},
				isAlpha: {
					msg: 'Last Name field must contain only letters.'
				}
			}
		},
		address: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron address is required!'
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron Email is required!'
				},
				isEmail: {
					msg: 'Email must be valid format.'
				}
			}
		},
		library_id: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron Library ID is required!'
				}
			}
		},
		zip_code: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					msg: 'Patron Zip Code is required!'
				},
				isNumeric: {
					msg: 'Zip Code can contain only numbers.'
				},
			}
		},
	}, {
		timestamps: false,
		underscored: true
	});
	patrons.associate = function(models) {
		// associations can be defined here
		patrons.hasMany(models.loans, { foreignKey: 'patron_id' });
		patrons.hasMany(models.books, { foreignKey: 'id' });
	};
	return patrons;
};
