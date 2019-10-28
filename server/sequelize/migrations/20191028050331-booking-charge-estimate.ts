import { QueryInterface } from "sequelize";

module.exports = {
	up: function(queryInterface: QueryInterface, Sequelize) {
		// logic for transforming into the new state
		return queryInterface.addColumn("Vehicles", "bookingChargeUnitId", {
			type: Sequelize.INTEGER,
			references: {
				model: "BookingChargeUnits", // name of Target model
				key: "id" // key in Target model that we're referencing
			}
		});
	},

	down: function(queryInterface: QueryInterface, Sequelize) {
		// logic for transforming into the new state
		return queryInterface.removeColumn("Vehicles", "bookingChargeUnitId");
	}
};
