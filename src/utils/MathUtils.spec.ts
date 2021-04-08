import { MathUtils } from "./MathUtils";

describe("MathUtils", () => {
	describe("Number range intersect check.", () => {
		it("Intersects.", () => {
			const intersects = MathUtils.rangeOverlap(1, 3, 2, 4);
			expect(intersects).toBeTruthy();
		});
		it("Does not intersect.", () => {
			const intersects = MathUtils.rangeOverlap(1, 2, 3, 4);
			expect(intersects).toBeFalsy();
		});
	});
});
