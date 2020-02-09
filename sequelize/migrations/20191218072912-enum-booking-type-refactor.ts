import { QueryInterface, QueryTypes, DataTypes } from "sequelize";
import moment from "moment";

enum BookingType {
	PRIVATE = "PRIVATE",
	BUSINESS = "BUSINESS",
	SERVICE = "SERVICE",
	REPLACEMENT = "REPLACEMENT"
}

module.exports = {
	up: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		// Booking Types
		await queryInterface.addColumn("Bookings", "bookingType", {
			allowNull: false,
			defaultValue: BookingType.PRIVATE,
			type: Sequelize.STRING
		});

		const bookingData = await queryInterface.sequelize.query<{
			bookingTypeTemp: string;
			id: number;
		}>(
			`
		SELECT
			*,
			BookingTypes.name as bookingTypeTemp
		FROM
			Bookings
				LEFT JOIN
			BookingTypes ON Bookings.bookingTypeId = BookingTypes.id`,
			{ type: QueryTypes.SELECT }
		);

		for (const item of bookingData) {
			await queryInterface.sequelize.query(
				`
			UPDATE
				Bookings
			SET
				bookingType = "${item.bookingTypeTemp}"
			WHERE
				id = ${item.id}
			`,
				{ type: QueryTypes.UPDATE }
			);
		}

		await queryInterface.changeColumn("Bookings", "bookingType", {
			allowNull: false,
			type: DataTypes.STRING
		});
		await queryInterface.removeColumn("Bookings", "bookingTypeId");
		await queryInterface.dropTable("BookingTypes");
	},
	down: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
		// Booking Types
		// Create Booking Types table
		await queryInterface.createTable("BookingTypes", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
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

		// Add Foreign key to BookingTypes in Bookings table

		await queryInterface.addColumn("Bookings", "bookingTypeId", {
			allowNull: true,
			type: Sequelize.INTEGER
		});

		let bookingsPrimaryKey = 1;

		for (const type in BookingType) {
			// Reinitialize BookingTypes
			await queryInterface.sequelize.query(
				`
				INSERT INTO
					BookingTypes (
					name,
					createdAt,
					deletedAt
					)
				VALUES (
					"${type}",
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
					Bookings
				SET
					bookingTypeId = ${bookingsPrimaryKey}
				WHERE
					bookingType = "${type}"
				`,
				{
					type: QueryTypes.INSERT
				}
			);
			bookingsPrimaryKey++;
		}
		// Update Nulls
		await queryInterface.sequelize.query(
			`
			UPDATE
				Bookings
			SET
				bookingTypeId = 1
			WHERE
				bookingTypeId = null
			`,
			{
				type: QueryTypes.INSERT
			}
		);

		await queryInterface.changeColumn("Bookings", "bookingTypeId", {
			allowNull: false,
			type: Sequelize.INTEGER
		});

		await queryInterface.removeColumn("Bookings", "bookingType");

		await queryInterface.addConstraint("Bookings", ["bookingTypeId"], {
			type: "foreign key",
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
			references: {
				table: "BookingTypes",
				field: "id"
			}
		});
	}
};
