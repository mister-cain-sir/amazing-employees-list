module.exports = {
  automock: false,
  bail: true,
  cache: false,
  modulePathIgnorePatterns: [
    "/dist/",
    "/node_modules/",
    "/gulpfile.js/",
    "/public/",
  ],
  collectCoverage: true,
  // collectCoverageFrom: ["./app/scripts/**/*.tsx"],
  coverageDirectory: "./app/tests/coverage",
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
};
