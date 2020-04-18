import { QueryInterface } from "sequelize";

module.exports = {
	up: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.createTable("BookingChargeUnits", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			unit: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Unit is required" }
				}
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: { type: Sequelize.DATE, allowNull: false }
		});
		await queryInterface.addColumn("Vehicles", "bookingChargeUnitId", {
			type: Sequelize.INTEGER,
			references: {
				model: "BookingChargeUnits",
				key: "id"
			}
		});
		await queryInterface.addColumn("Vehicles", "bookingChargeCount", {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false
		});
		await queryInterface.addColumn("Vehicles", "bookingCharge", {
			type: Sequelize.FLOAT,
			defaultValue: 0,
			allowNull: false
		});
	},
	down: async function(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.removeColumn("Vehicles", "bookingChargeUnitId");
		await queryInterface.dropTable("BookingChargeUnits", {
			force: true
		});
		await queryInterface.removeColumn("Vehicles", "bookingChargeCount");
		await queryInterface.removeColumn("Vehicles", "bookingCharge");
	}
};
