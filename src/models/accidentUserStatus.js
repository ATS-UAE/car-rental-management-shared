module.exports = (sequelize, DataTypes) => {
	let AccidentUserStatus = sequelize.define("AccidentUserStatus", {
		read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
		deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
	});

	return AccidentUserStatus;
};
