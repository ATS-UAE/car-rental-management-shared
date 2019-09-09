"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RBAC {
    constructor(name) {
        this.name = name;
        this.roles = [];
    }
    addRole(role) {
        let existing = this.roles.find((roleItem) => roleItem.name === role.name);
        if (existing)
            throw new Error("Role already exists");
        this.roles.push(role);
    }
    can(role, action, resource, params) {
        return new Promise(async (resolve) => {
            let existingRole = this.roles.find((roleItem) => {
                if (role instanceof Role) {
                    return role.name === roleItem.name;
                }
                return role === roleItem.name;
            });
            if (!existingRole)
                throw new Error("Role does not exist.");
            let permitted = await existingRole.can(action, resource, params);
            resolve(permitted);
        });
    }
    getExcludedFields(role, action, resource) {
        let $role = this.roles.find(($role) => $role.name === role);
        if ($role) {
            let excludedFields = [];
            if ($role.extends) {
                for (let role of $role.extends) {
                    let $action = role.actions.find($action => $action.name === action && $action.resource.name === resource);
                    if ($action) {
                        excludedFields.push(...$action.excludedFields);
                    }
                }
            }
            let $action = $role.actions.find($action => $action.name === action && $action.resource.name === resource);
            if ($action) {
                excludedFields.push(...$action.excludedFields);
            }
            return excludedFields;
        }
        else
            throw new Error("Role does not exist.");
    }
    toObject() {
        return {
            name: this.name,
            roles: this.roles.map(role => ({
                name: role.name,
                access: role.actions.reduce((acc, action) => {
                    if (!acc.resources[action.resource.name]) {
                        acc.resources[action.resource.name] = {
                            permissions: {}
                        };
                    }
                    acc.resources[action.resource.name].permissions[action.name] = {
                        conditional: action.condition ? true : false,
                        excludedFields: action.excludedFields
                    };
                    return acc;
                }, {
                    resources: {}
                }),
                extends: role.extends.map(role => role.name)
            }))
        };
    }
}
exports.RBAC = RBAC;
class Role {
    constructor(name) {
        this.name = name;
        this.actions = [];
        this.extends = [];
    }
    addPermission(action) {
        let existingAction = this.actions.find(currentAction => currentAction.name === action.name &&
            currentAction.resource.name === action.resource.name);
        if (existingAction)
            throw new Error("Action already exists.");
        this.actions.push(action);
    }
    extend(role) {
        this.extends.push(role);
    }
    can(action, resource, params) {
        return new Promise(async (resolve) => {
            let actions = this.actions;
            let resourceName = resource instanceof Resource ? resource.name : resource;
            for (let i = 0; i < actions.length; i++) {
                let currentAction = actions[i];
                if (action === currentAction.name &&
                    currentAction.resource.name === resourceName) {
                    let permitted;
                    try {
                        permitted = await currentAction.perform(params);
                    }
                    catch (e) {
                        permitted = false;
                    }
                    if (permitted) {
                        return resolve(permitted);
                    }
                }
            }
            // Contine looking for matching actions, incase role is extended.
            if (this.extends) {
                for (let i = 0; i < this.extends.length; i++) {
                    let extendedRole = this.extends[i];
                    let permitted = await extendedRole.can(action, resource, params);
                    if (permitted) {
                        return resolve(permitted);
                    }
                }
            }
            return resolve(false);
        });
    }
}
exports.Role = Role;
class Action {
    constructor(name, resource, condition, excludedFields = []) {
        this.name = name;
        this.resource = resource;
        this.condition = condition;
        this.excludedFields = excludedFields;
    }
    perform(params) {
        if (this.condition) {
            return this.condition(params);
        }
        return true;
    }
}
exports.Action = Action;
class Resource {
    constructor(name) {
        this.name = name;
    }
}
exports.Resource = Resource;
exports.default = RBAC;
