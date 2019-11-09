export default (sequelize, DataTypes) => {
	let VehicleIssue = sequelize.define("VehicleIssues", {
		message: {
			type: DataTypes.STRING(256),
			allowNull: false,
			validate: {
				notNull: { msg: "Message is required." }
			}
		}
	});
	VehicleIssue.associate = models => {
		models.VehicleIssue.belongsTo(models.Vehicle, {
			foreignKey: { name: "vehicleId" },
			as: "vehicle",
			allowNull: false,
			validate: {
				notNull: { msg: "Vehicle is required." }
			}
		});
	};
	return VehicleIssue;
};
