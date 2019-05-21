"use strict";

module.exports = {
	up: function(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn("Bookings", "amount", {
				type: Sequelize.FLOAT
			}),
			queryInterface.addColumn("Vehicles", "vehicleImageSrc", {
				type: Sequelize.STRING
			}),
			queryInterface.addColumn("Locations", "locationImageSrc", {
				type: Sequelize.STRING
			})
		]);
	},

	down: function(queryInterface, Sequelize) {
		// logic for reverting the changes
	}
};
