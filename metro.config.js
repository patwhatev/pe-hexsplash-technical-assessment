const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for @ path alias resolution
// This is required for bundling to work properly with TypeScript path aliases
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    '@': path.resolve(__dirname),
  },
};

// Ensure routerRoot is set for expo-router
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
      routerRoot: 'app',
    },
  }),
};

module.exports = config;
