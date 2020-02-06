import { QueryInterface } from "sequelize";

module.exports = {
	up: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.addColumn("Vehicles", "wialonUnitId", {
			type: Sequelize.INTEGER
		});
	},
	down: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.removeColumn("Vehicles", "wialonUnitId");
	}
};
