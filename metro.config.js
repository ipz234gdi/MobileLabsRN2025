// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Додаємо .cjs до перелічених розширень
config.resolver.sourceExts.push("cjs");

// Вимикаємо експериментальну перевірку package-exports
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
