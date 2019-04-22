export default function RBAC(permissionData) {
	return {
		can: function(role, action, resource) {
			console.log(role, action, resource);
			let $role = permissionData.roles.find(roleItem => roleItem.name === role);
			let access = {
				can: false,
				excludedFields: []
			};
			if ($role) {
				if ($role.access && $role.access.resources) {
					let roleResources = $role.access.resources[resource];
					if (roleResources) {
						if (roleResources.permissions) {
							let roleAction = roleResources.permissions[action];
							if (roleAction) {
								access.can = true;
								if (roleAction.excludedFields) {
									access.excludedFields.push(...roleAction.excludedFields);
								}
								return access;
							}
						}
					}
				}

				if ($role.extends) {
					for (let extendedRole of $role.extends) {
						let extendedAccess = this.can(extendedRole, action, resource);
						if (extendedAccess.can) {
							access.can = extendedAccess.can;
						}
						access.excludedFields.push(...extendedAccess.excludedFields);
					}
				}
			}
			return access;
		}
	};
}
