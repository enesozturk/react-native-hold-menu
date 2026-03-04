const fs = require('fs');
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
);
const escapeRegExp = value =>
  value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

const modules = [
  ...Object.keys(packageJson.peerDependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
];

const config = getDefaultConfig(__dirname);

config.watchFolders = [root];
config.resolver.blockList = exclusionList([
  new RegExp(`^${escapeRegExp(path.join(root, 'node_modules'))}\\/.*$`),
]);
config.resolver.extraNodeModules = modules.reduce((accumulator, name) => {
  accumulator[name] = path.join(__dirname, 'node_modules', name);
  return accumulator;
}, {});

module.exports = config;
