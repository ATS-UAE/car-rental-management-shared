export default (sequelize, DataTypes) => {
	let Accident = sequelize.define("AccidentUserStatus", {
		read: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
	return Accident;
};
