"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../utils/helpers");
const enums_1 = require("../variables/enums");
class DB {
    constructor() {
        return this.sequelize();
    }
    sequelize() {
        const sequelize = new sequelize_1.Sequelize(config_1.default.database.name, config_1.default.database.username, config_1.default.database.password, Object.assign({ logging: process.env.NODE_ENV === "development" ? console.log : false, host: config_1.default.database.host, port: parseInt(config_1.default.database.port), define: {
                hooks: {
                    afterFind: (results) => {
                        if (results) {
                            helpers_1.convertSequelizeDatesToUnix(results);
                        }
                    }
                }
            } }, config_1.default.database.sequelize));
        const db = {};
        const modelPath = path_1.default.join(__dirname);
        const basename = path_1.default.basename(__filename);
        fs_1.default.readdirSync(modelPath)
            .filter(file => file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js")
            .forEach(file => {
            const model = sequelize.import(modelPath + file);
            db[model.name] = model;
            console.log(model.name);
            console.log(db[model.name]);
        });
        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        db.sequelize = sequelize;
        sequelize
            .authenticate()
            .then(() => this.init(db, { sync: { options: {} } }))
            .then(() => console.log("Connection has been established successfully."))
            .catch(err => {
            console.error("Unable to connect to the database\n", err);
        });
        return db;
    }
    async init(db, params) {
        if (params.sync) {
            await db.sequelize.sync(params.sync.options);
        }
        let users = await db.User.findAll({
            include: [{ model: db.Role, as: "role" }]
        });
        let roles = await db.Role.findAll();
        if (roles.length === 0) {
            await Promise.all(Object.values(enums_1.Role).map(name => db.Role.create({ name })));
            await Promise.all(Object.values(enums_1.BookingType).map(name => db.BookingType.create({ name })));
        }
        if (users.length === 0) {
            let adminRole = await db.Role.findOne({
                where: { name: enums_1.Role.ADMIN }
            });
            // Create root user...
            let rootPassword = await bcryptjs_1.default.hash(config_1.default.database.password, 10);
            await db.User.create({
                username: "root",
                password: rootPassword,
                firstName: "Ramil",
                lastName: "Amparo",
                gender: "m",
                email: "ramil@atsuae.net",
                roleId: adminRole.dataValues.id,
                mobileNumber: "+971562341841",
                approved: true
            });
        }
    }
}
const db = new DB();
exports.default = db;
