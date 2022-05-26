const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const extraNodeModules = {
  'react-native-hold-menu': path.resolve(__dirname + '/../src'),
};
const watchFolders = [path.resolve(__dirname + '/../src')];

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};
