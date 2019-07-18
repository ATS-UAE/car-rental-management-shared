"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn("Bookings", "replacementVehicleId", {
				type: Sequelize.INTEGER(11),
				references: {
					model: "ReplacementVehicles",
					key: "id"
				}
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn("Bookings", "replacementVehicleId");
	}
};
