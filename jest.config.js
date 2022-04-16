module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/node_modules/", "./node_modules./", ".js"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  collectCoverage: true
};