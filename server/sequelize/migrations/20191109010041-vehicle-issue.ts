import { QueryInterface } from "sequelize";

module.exports = {
	up: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.createTable("VehicleIssues", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			message: {
				type: Sequelize.STRING(256),
				allowNull: false
			},
			vehicleId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Vehicles",
					key: "id"
				}
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: { type: Sequelize.DATE, allowNull: false }
		});
	},
	down: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.dropTable("VehicleIssues", {
			force: true
		});
	}
};
