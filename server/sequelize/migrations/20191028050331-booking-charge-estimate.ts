import { QueryInterface } from "sequelize";

module.exports = {
	up: function(queryInterface: QueryInterface, Sequelize) {
		// logic for transforming into the new state
		return Promise.all([
			queryInterface.addColumn("Vehicles", "bookingChargeTime", {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			}),
			queryInterface.addColumn("Vehicles", "bookingChargeDistance", {
				type: Sequelize.FLOAT,
				defaultValue: 0,
				allowNull: false
			}),
			queryInterface.addColumn("Vehicles", "bookingCharge", {
				type: Sequelize.FLOAT,
				defaultValue: 0,
				allowNull: false
			}),
			queryInterface.addColumn("Vehicles", "bookingChargeByTime", {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
				allowNull: false
			})
		]);
	},
	down: function(queryInterface: QueryInterface, Sequelize) {
		// logic for transforming into the new state
		return Promise.all([
			queryInterface.removeColumn("Vehicles", "bookingChargeTime"),
			queryInterface.removeColumn("Vehicles", "bookingChargeDistance"),
			queryInterface.removeColumn("Vehicles", "bookingCharge"),
			queryInterface.removeColumn("Vehicles", "bookingChargeByTime")
		]);
	}
};
