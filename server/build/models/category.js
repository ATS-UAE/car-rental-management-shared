"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let Category = sequelize.define("Category", {
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
    Category.associate = models => {
        models.Category.belongsTo(models.Client, {
            foreignKey: {
                name: "clientId",
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please specify which client this category belongs to."
                    }
                }
            },
            as: "client"
        });
    };
    return Category;
};
