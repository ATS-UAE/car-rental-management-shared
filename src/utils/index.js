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
