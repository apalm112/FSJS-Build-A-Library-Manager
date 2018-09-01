'use strict';

module.exports = (sequelize, DataTypes) => {
	const patrons = sequelize.define('patrons', {
		first_name: {
			type: DataTypes.STRING,
			validate: {
				isAlpha: { msg: 'A Valid First Name is required.' }
			}
		},
		last_name: {
			type: DataTypes.STRING,
			validate: {
				isAlpha: { msg: 'A Valid Last Name is required.' }
			}
		},
		address: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {	msg: 'Patron address is required!'}
			}
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: { msg: 'A Valid Email is required.'	}
			}
		},
		library_id: {
			type: DataTypes.STRING,
			validate: {
				isAlphanumeric: {	msg: 'Patron Library ID is required!'	}
			}
		},
		zip_code: {
			type: DataTypes.INTEGER,
			validate: {
				isNumeric: {	msg: 'A Valid Zip Code is required.'	},
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
