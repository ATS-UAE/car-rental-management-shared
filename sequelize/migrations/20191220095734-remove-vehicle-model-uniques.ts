import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		await queryInterface.removeColumn("Vehicles", "objectId");
		await queryInterface.changeColumn("Vehicles", "plateNumber", {
			allowNull: true,
			type: Sequelize.STRING
		});
		await queryInterface.changeColumn("Vehicles", "vin", {
			allowNull: true,
			type: Sequelize.STRING
		});
		await queryInterface
			.removeConstraint("Vehicles", "Vehicles_plateNumber_unique")
			.catch(() => undefined);
		await queryInterface
			.removeConstraint("Vehicles", "Vehicles_plateNumber_uk")
			.catch(() => undefined);
		await queryInterface
			.removeConstraint("Vehicles", "Vehicles_vin_unique")
			.catch(() => undefined);
		await queryInterface
			.removeConstraint("Vehicles", "Vehicles_vin_uk")
			.catch(() => undefined);
	},
	down: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		await queryInterface.addColumn("Vehicles", "objectId", {
			unique: true,
			type: Sequelize.STRING,
			allowNull: false
		});
		await queryInterface.changeColumn("Vehicles", "plateNumber", {
			allowNull: false,
			type: Sequelize.STRING
		});
		await queryInterface.changeColumn("Vehicles", "vin", {
			allowNull: false,
			type: Sequelize.STRING
		});
		await queryInterface.addConstraint("Vehicles", ["plateNumber"], {
			type: "unique"
		});
		await queryInterface.addConstraint("Vehicles", ["vin"], {
			type: "unique"
		});
	}
};
