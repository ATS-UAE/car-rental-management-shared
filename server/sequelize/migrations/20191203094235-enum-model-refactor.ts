import { QueryInterface, QueryTypes, DataTypes } from "sequelize";
import moment from "moment";

enum BookingType {
	PRIVATE = "PRIVATE",
	BUSINESS = "BUSINESS",
	SERVICE = "SERVICE",
	REPLACEMENT = "REPLACEMENT"
}

enum Role {
	MASTER = "MASTER",
	ADMIN = "ADMIN",
	KEY_MANAGER = "KEY_MANAGER",
	GUEST = "GUEST"
}

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
			type: Sequelize.INTEGER,
			defaultValue: null
		});
		await queryInterface.removeColumn("Bookings", "bookingTypeId");
		await queryInterface.dropTable("BookingTypes");
		// User Roles

		await queryInterface.addColumn("Users", "role", {
			allowNull: false,
			defaultValue: Role.GUEST,
			type: Sequelize.STRING
		});

		const userData = await queryInterface.sequelize.query<{
			roleTemp: string;
			id: number;
		}>(
			`
		SELECT
			*,
			Roles.name as roleTemp
		FROM
			Users
				LEFT JOIN
			Roles ON Users.roleId = Roles.id`,
			{ type: QueryTypes.SELECT }
		);

		for (const item of userData) {
			await queryInterface.sequelize.query(
				`
			UPDATE
				Users
			SET
				role = "${item.roleTemp}"
			WHERE
				id = ${item.id}
			`,
				{ type: QueryTypes.UPDATE }
			);
		}

		await queryInterface.changeColumn("Users", "role", {
			type: Sequelize.INTEGER,
			defaultValue: null
		});
		await queryInterface.removeColumn("Users", "roleId");
		await queryInterface.dropTable("Roles");

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
	down: async function(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
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
			type: Sequelize.INTEGER,
			references: {
				model: "BookingTypes",
				key: "id"
			}
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
			type: Sequelize.INTEGER,
			defaultValue: null,
			references: {
				model: "BookingTypes",
				key: "id"
			}
		});

		await queryInterface.removeColumn("Bookings", "bookingType");

		// User Roles
		// Create Roles table
		await queryInterface.createTable("Roles", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
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

		// Add Foreign key to Roles in Users table

		await queryInterface.addColumn("Users", "roleId", {
			allowNull: true,
			type: Sequelize.INTEGER,
			references: {
				model: "Roles",
				key: "id"
			}
		});

		let rolePrimaryKey = 1;

		for (const item in Role) {
			// Reinitialize Roles
			await queryInterface.sequelize.query(
				`
				INSERT INTO Roles (
					name,
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
					Users
				SET
					roleId = ${rolePrimaryKey}
				WHERE
					role = "${item}"
				`,
				{
					type: QueryTypes.INSERT
				}
			);
			rolePrimaryKey++;
		}
		// Update Nulls
		await queryInterface.sequelize.query(
			`
			UPDATE
				Users
			SET
				roleId = 4
			WHERE
				roleId = null
			`,
			{
				type: QueryTypes.INSERT
			}
		);

		await queryInterface.changeColumn("Users", "roleId", {
			allowNull: false,
			type: Sequelize.INTEGER,
			defaultValue: null,
			references: {
				model: "Role",
				key: "id"
			}
		});

		await queryInterface.removeColumn("Users", "role");

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
