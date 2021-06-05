module.exports = {
  moduleFileExtensions: ["js", "vue"],
  transform: {
    "\\.vue$": "vue-jest",
    "\\.js$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**", "!**/dist/**"],
};
