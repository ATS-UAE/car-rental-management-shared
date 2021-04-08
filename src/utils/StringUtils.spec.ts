import { StringUtils } from "./StringUtils";

describe("StringUtils", () => {
	it("Should return a capitalized snake case string to a proper phrase.", () => {
		const SNAKE_CASE = "THIS_IS_ME!";
		const title = StringUtils.toTitleWords(SNAKE_CASE);

		expect(title).toEqual("This Is Me!");
	});
});
