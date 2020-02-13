import { QueryInterface } from "sequelize";

module.exports = {
	up: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.addColumn("Bookings", "returned", {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		});
	},
	down: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.removeColumn("Bookings", "returned");
	}
};
