import { QueryInterface, QueryTypes, DataTypes } from "sequelize";
import moment from "moment";

enum BookingChargeUnit {
	KILOMETER = "Km",
	SECOND = "Second",
	HOUR = "Hour",
	DAY = "Day",
	WEEK = "Week",
	MONTH = "Month"
}

module.exports = {
	up: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		// Booking Charge Unit

		await queryInterface.addColumn("Vehicles", "bookingChargeUnit", {
			type: Sequelize.STRING
		});

		const vehicledata = await queryInterface.sequelize.query<{
			bookingChargeUnitTemp: string;
			id: number;
		}>(
			`
		SELECT
			*,
			BookingChargeUnits.unit as bookingChargeUnitTemp
		FROM
			Vehicles
				LEFT JOIN
			BookingChargeUnits ON Vehicles.bookingChargeUnitId = BookingChargeUnits.id`,
			{ type: QueryTypes.SELECT }
		);

		for (const item of vehicledata) {
			await queryInterface.sequelize.query(
				`
			UPDATE
				Vehicles
			SET
				bookingChargeUnit = "${item.bookingChargeUnitTemp}"
			WHERE
				id = ${item.id}
			`,
				{ type: QueryTypes.UPDATE }
			);
		}

		await queryInterface.removeColumn("Vehicles", "bookingChargeUnitId");
		await queryInterface.dropTable("BookingChargeUnits");
	},
	down: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		// Booking Charge Unit
		// Create BookingChargeUnit table
		await queryInterface.createTable("BookingChargeUnits", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			unit: {
				type: Sequelize.STRING,
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			deletedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});

		// Add Foreign key to BookingChargeUnits in Vehicles table

		await queryInterface.addColumn("Vehicles", "bookingChargeUnitId", {
			allowNull: true,
			type: Sequelize.INTEGER,
			references: {
				model: "BookingChargeUnits",
				key: "id"
			}
		});

		let bookingChargeUnitPrimaryKey = 1;

		for (const item in BookingChargeUnit) {
			// Reinitialize BookingChargeUnits
			await queryInterface.sequelize.query(
				`
				INSERT INTO BookingChargeUnits (
					unit,
					createdAt,
					deletedAt
				)
				VALUES (
					"${item}",
					"${moment().format("YYYY-MM-DD HH:mm:ss")}",
					"${moment().format("YYYY-MM-DD HH:mm:ss")}"
				)
				`,
				{
					type: QueryTypes.INSERT
				}
			);
			// Update Bookings
			await queryInterface.sequelize.query(
				`
				UPDATE
					Vehicles
				SET
					bookingChargeUnitId = ${bookingChargeUnitPrimaryKey}
				WHERE
					bookingChargeUnit = "${item}"
				`,
				{
					type: QueryTypes.INSERT
				}
			);
			bookingChargeUnitPrimaryKey++;
		}

		await queryInterface.removeColumn("Vehicles", "bookingChargeUnit");
	}
};
