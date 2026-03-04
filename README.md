# React Native Hold Menu

[![npm](https://img.shields.io/npm/l/react-native-hold-menu?style=flat-square)](https://www.npmjs.com/package/react-native-hold-menu) [![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/react-native-hold-menu) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/)

A lean, modern hold-to-open context menu for React Native powered by Reanimated 4.

> This release is a semver-major modernization focused on removing internal dependencies, pushing host integrations to peers, and aligning the package with the Reanimated 4 + worklets toolchain.

---

![hold-menu-preview](./preview.gif)

## Requirements

- `react-native >= 0.83`
- `react >= 19.2`
- `react-native-reanimated >= 4`
- `react-native-worklets >= 0.7`
- `react-native-gesture-handler >= 2`
- `expo-blur`
- `expo-haptics`

## Installation

```bash
pnpm add react-native-hold-menu react-native-reanimated react-native-worklets react-native-gesture-handler expo-blur expo-haptics
```

## Required setup

Wrap your app root with `GestureHandlerRootView` and keep the worklets Babel plugin last:

```tsx
import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HoldMenuProvider } from 'react-native-hold-menu';

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HoldMenuProvider>{/* app */}</HoldMenuProvider>
    </GestureHandlerRootView>
  );
}
```

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-worklets/plugin'],
};
```

## Breaking changes in 1.0

- `HoldMenuProvider` no longer wraps `GestureHandlerRootView`.
- `HoldItem.theme` was removed.
- `@gorhom/portal`, `lodash.isequal`, and `nanoid` are no longer used by the package.
- Type source files now live as normal `.ts` modules and are emitted by Bob directly.

## Features

- Powered by Reanimated 4.
- Uses the modern gesture API.
- Keeps Expo blur and haptics as host-level peer dependencies.
- Supports dark and light themes.
- Supports device orientation changes.
- Written in TypeScript.

## Documentation

Run the local docs site with `pnpm docs`, or build it with `pnpm docs:build`.
