"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameColumn(
				"Bookings",
				"replacementVehicleId",
				"replaceVehicleId"
			)
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameColumn(
				"Bookings",
				"replaceVehicleId",
				"replacementVehicleId"
			)
		]);
	}
};
