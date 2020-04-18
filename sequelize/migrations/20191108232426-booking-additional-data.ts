import { QueryInterface } from "sequelize";

module.exports = {
	up: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.addColumn("Bookings", "startMileage", {
			type: Sequelize.FLOAT
		});
		await queryInterface.addColumn("Bookings", "endMileage", {
			type: Sequelize.FLOAT
		});
		await queryInterface.addColumn("Bookings", "startFuel", {
			type: Sequelize.FLOAT
		});
		await queryInterface.addColumn("Bookings", "endFuel", {
			type: Sequelize.FLOAT
		});
	},
	down: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.removeColumn("Bookings", "startMileage");
		await queryInterface.removeColumn("Bookings", "endMileage");
		await queryInterface.removeColumn("Bookings", "startFuel");
		await queryInterface.removeColumn("Bookings", "endFuel");
	}
};
