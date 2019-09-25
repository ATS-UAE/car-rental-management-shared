"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(require("./DataSource"));
const enums_1 = require("../variables/enums");
const rbac_1 = __importDefault(require("../utils/rbac"));
const exceptions_1 = require("../utils/exceptions");
class User extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role.name;
        let foundUser = await this.getUser(id, {
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.USERS)
        });
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.USERS, {
            accessor: this.user,
            target: foundUser
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundUser;
    }
    async getAll() {
        let role = this.user.role.name;
        let foundUsers = await this.getUsers({
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.USERS)
        });
        let users = [];
        for (let user of foundUsers) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.USERS, {
                accessor: this.user,
                target: user
            });
            if (accessible) {
                users.push(user);
            }
        }
        return users;
    }
    async update(id, data, options) {
        let role = this.user.role.name;
        let foundUser = await this.get(id);
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.USERS, {
            accessor: this.user,
            target: foundUser
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundUser.update(data, options);
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role.name;
        let foundUser = await this.get(id);
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.USERS, {
            accessor: this.user,
            target: foundUser
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundUser.destroy();
        return foundUser;
    }
    async create(data, options = {}) {
        let role = this.user.role.name;
        let accessible = options.invited ||
            (await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.USERS, {
                accessor: this.user
            }));
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        let newUserRole = await this.db.Role.findByPk(data.roleId);
        let guestRole = await this.db.Role.findOne({
            where: { name: enums_1.Role.GUEST }
        });
        let createdUser = await this.createUser(Object.assign({}, data, { roleId: options.invited ? guestRole.id : newUserRole.id, approved: !options.invited }));
        return createdUser;
    }
}
exports.default = User;
