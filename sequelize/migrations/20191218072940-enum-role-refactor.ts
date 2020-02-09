import { QueryInterface, QueryTypes, DataTypes } from "sequelize";
import moment from "moment";

enum Role {
	MASTER = "MASTER",
	ADMIN = "ADMIN",
	KEY_MANAGER = "KEY_MANAGER",
	GUEST = "GUEST"
}

module.exports = {
	up: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
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
			allowNull: false,
			type: DataTypes.STRING
		});
		await queryInterface.removeColumn("Users", "roleId");
		await queryInterface.dropTable("Roles");
	},
	down: async function(
		queryInterface: QueryInterface,
		Sequelize: typeof DataTypes
	) {
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
			type: Sequelize.INTEGER
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
			type: Sequelize.INTEGER
		});

		await queryInterface.addConstraint("Users", ["roleId"], {
			type: "foreign key",
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
			references: {
				table: "Roles",
				field: "id"
			}
		});

		await queryInterface.removeColumn("Users", "role");
	}
};
