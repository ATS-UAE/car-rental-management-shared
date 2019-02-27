export function runIfExistFunction(func, parent, args) {
	return function() {
		if (typeof func === "function") {
			if (parent) {
				func.apply(parent, args);
			}
			func(args);
		}
	};
}

export function Validator(test, errorMessage) {
	this.test = test;
	this.error = errorMessage;
}

// Returns errored validators.
Validator.runThroughValidators = function runThroughValidators(
	validators = [],
	validatee
) {
	let errors = [];
	for (let i = 0; i < validators.length; i++) {
		let validator = validators[i].test.bind(validators[i].test);
		if (validatee !== undefined && !validator(validatee))
			errors.push(validators[i]);
	}
	return errors;
};

export const validators = {
	username: [
		new Validator(
			v => /.{5,}/.test(v),
			"Username should be greater than 5 characters."
		)
	],
	password: [
		new Validator(
			v => /.{8,}/.test(v),
			"Password should be greater than 8 characters."
		)
	],
	email: [
		new Validator(
			v =>
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					v
				),
			"Invalid email."
		)
	]
};
