export default (sequelize, DataTypes) => {
	let Location = sequelize.define("Location", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Name is required" }
			}
		},
		lat: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			validate: {
				notNull: { msg: "Location is required" }
			}
		},
		lng: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			validate: {
				notNull: { msg: "Location is required" }
			}
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Address required" }
			}
		},
		locationImageSrc: { type: DataTypes.STRING }
	});
	Location.associate = models => {
		models.Location.belongsTo(models.Client, {
			foreignKey: {
				name: "clientId",
				allowNull: false,
				validate: {
					notNull: {
						msg: "Please specify which client this location belongs to."
					}
				}
			},
			as: "client"
		});
	};
	return Location;
};
