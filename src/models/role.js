module.exports = (sequelize, DataTypes) => {
	let Role = sequelize.define("Role", {
		name: { type: DataTypes.STRING, allowNull: false }
	});

	return Role;
};
