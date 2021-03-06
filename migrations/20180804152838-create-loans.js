'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('loans', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			book_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'books',
					key: 'id',
				}
			},
			patron_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'patrons',
					key: 'id',
				}
			},
			loaned_on: {
				type: Sequelize.DATEONLY,
			},
			return_by: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			returned_on: {
				type: Sequelize.DATEONLY
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('loans');
	}
};
