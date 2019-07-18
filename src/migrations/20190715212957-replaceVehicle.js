"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameTable("ReplacementVehicles", "ReplaceVehicles")
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameTable("ReplaceVehicles", "ReplacementVehicles")
		]);
	}
};
