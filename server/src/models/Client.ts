export default (sequelize, { STRING }) => {
	let Client = sequelize.define("Client", {
		name: {
			type: STRING,
			unique: { args: true, msg: "Client name already in use!" },
			allowNull: false,
			validate: {
				notNull: { msg: "Client name is required" }
			}
		}
	});

	Client.associate = models => {
		models.Client.hasMany(models.User, {
			foreignKey: {
				name: "clientId"
			},
			as: "users"
		});
		models.Client.hasMany(models.Vehicle, {
			foreignKey: {
				name: "clientId"
			},
			as: "vehicles"
		});
		models.Client.hasMany(models.Category, {
			foreignKey: {
				name: "clientId"
			},
			as: "categories"
		});
		models.Client.belongsToMany(models.Location, {
			as: "locations",
			foreignKey: "clientId",
			through: "ClientLocations"
		});
	};

	return Client;
};
