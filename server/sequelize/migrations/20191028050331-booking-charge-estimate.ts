import { QueryInterface } from "sequelize";

module.exports = {
	up: function(queryInterface: QueryInterface, Sequelize) {
		// logic for transforming into the new state
		return Promise.all([
			queryInterface.addColumn("Vehicles", "bookingChargeTime", {
				type: Sequelize.INTEGER,
				defaultValue: 0
			}),
			queryInterface.addColumn("Vehicles", "bookingChargeDistance", {
				type: Sequelize.INTEGER,
				defaultValue: 0
			}),
			queryInterface.addColumn("Vehicles", "bookingCharge", {
				type: Sequelize.INTEGER,
				defaultValue: 0
			})
		]);
	},

	down: function(queryInterface: QueryInterface, Sequelize) {
		// logic for transforming into the new state
		return Promise.all([
			queryInterface.removeColumn("Vehicles", "bookingChargeTime"),
			queryInterface.removeColumn("Vehicles", "bookingChargeDistance"),
			queryInterface.removeColumn("Vehicles", "bookingCharge")
		]);
	}
};
