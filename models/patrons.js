'use strict';

module.exports = (sequelize, DataTypes) => {
	const patrons = sequelize.define('patrons', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		first_name: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron First Name is required!'
				}
			}
		},
		last_name: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Patron Last Name is required!'
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
				}
			}
		},
	}, {
		timestamps: false,
	});
	patrons.associate = function(models) {
		// associations can be defined here
		patrons.hasMany(models.loans);
	};
	return patrons;
};
