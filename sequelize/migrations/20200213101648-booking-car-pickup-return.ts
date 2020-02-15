import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		await queryInterface.addColumn("Bookings", "returnDate", {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: null
		});
		await queryInterface.addColumn("Bookings", "pickupDate", {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: null
		});
	},
	down: async function(queryInterface: QueryInterface) {
		await queryInterface.removeColumn("Bookings", "returnDate");
		await queryInterface.removeColumn("Bookings", "pickupDate");
	}
};
