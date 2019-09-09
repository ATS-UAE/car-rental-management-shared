module.exports = (sequelize, DataTypes) => {
    let Role = sequelize.define("Role", {
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
    return Role;
};
