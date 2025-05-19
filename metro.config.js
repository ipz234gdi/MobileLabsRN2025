// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");
const config = getDefaultConfig(__dirname);

// Додаємо підтримку .cjs-файлів
config.resolver.sourceExts.push("cjs");

// Вимикаємо суворі перевірки package-exports для ESM
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
