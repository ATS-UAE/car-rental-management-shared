module.exports = {
	preset: "ts-jest",
	setupFiles: ["./src/setupTests.ts"],
	setupFilesAfterEnv: ["jest-extended"],
	// Ignore mobile test cases, node_modules.
	testPathIgnorePatterns: ["/node_modules/", "<rootDir>src/mobile/"]
};
