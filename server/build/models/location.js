module.exports = (sequelize, DataTypes) => {
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
    return Location;
};
