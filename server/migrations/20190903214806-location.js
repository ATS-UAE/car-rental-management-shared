"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn("Locations", "clientId", {
				type: Sequelize.INTEGER,
				references: { model: "Clients", key: "id" }
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	}
};
