'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('books', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			genre: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			first_published: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('books');
	}
};
