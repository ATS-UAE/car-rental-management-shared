import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		await queryInterface.addColumn("Users", "timeZone", {
			allowNull: false,
			defaultValue: "Asia/Dubai",
			type: Sequelize.STRING
		});
	},
	down: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.removeColumn("Users", "timeZone");
	}
};
