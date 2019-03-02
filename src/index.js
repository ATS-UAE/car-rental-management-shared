const RBAC = require("./rbac");

const ATSAccessControl = new RBAC({
	admin: {
		can: ["publish"],
		inherits: ["writer"]
	},
	key_manager: {
		can: ["write"],
		inherits: ["guest"]
	},
	guest: {
		can: ["read"]
	}
});

ATSAccessControl.can("writer", "read", (b, a) => {
	console.log(a);
});
