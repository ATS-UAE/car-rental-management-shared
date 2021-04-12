import { YupUtils } from "./YupUtils";

describe("YupUtils", () => {
	describe("Replace empty string", () => {
		it("Replaces an empty string.", () => {
			const REPLACEMENT = "Test";
			const replaced = YupUtils.transformEmptyStringTo(REPLACEMENT)("", "");
			expect(replaced).toEqual(REPLACEMENT);
		});
		it("Does not replace a non-empty string.", () => {
			const REPLACEMENT = "Test";
			const VALUE = "Original Value";
			const replaced = YupUtils.transformEmptyStringTo(REPLACEMENT)(VALUE, VALUE);
			expect(replaced).toEqual(VALUE);
		});
	});
});
