'use strict';
module.exports = (sequelize, DataTypes) => {
	const patrons = sequelize.define('patrons', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
		},
		last_name: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		library_id: {
			type: DataTypes.STRING,
		},
		zip_code: {
			type: DataTypes.INTEGER,
		},
	}, {});
	patrons.associate = function(models) {
		// associations can be defined here
	};
	return patrons;
};
