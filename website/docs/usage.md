---
id: usage
title: Usage
slug: /usage
hide_table_of_contents: true
hide_title: true
---

## Usage

### HoldMenuProvider

Before using Hold Menu in your application, wrap your app root with `GestureHandlerRootView`, then add `HoldMenuProvider`.

See all the [HoldMenuProvider props](/react-native-hold-menu/docs/props#holdmenuprovider).

```tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HoldMenuProvider } from 'react-native-hold-menu';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HoldMenuProvider theme="light">
        {/* Your app components */}
      </HoldMenuProvider>
    </GestureHandlerRootView>
  );
};

export default App;
```

### HoldItem

Now you can wrap your components with `HoldItem`. You need to set [items](/react-native-hold-menu/docs/props#items) prop and also see other optional props for your menu.

See all the [HoldItem props](/react-native-hold-menu/docs/props#holditem).

```tsx
import React from 'react';
import { View } from 'react-native';

import { HoldItem } from 'react-native-hold-menu';

import styles from './styles';

const MenuItems = [
  { text: 'Actions', icon: 'home', isTitle: true, onPress: () => {} },
  { text: 'Action 1', icon: 'edit', onPress: () => {} },
  { text: 'Action 2', icon: 'map-pin', withSeparator: true, onPress: () => {} },
  { text: 'Action 3', icon: 'trash', isDestructive: true, onPress: () => {} },
];

const Example = () => {
  return (
    <View style={styles.container}>
      <HoldItem items={MenuItems} hapticFeedback="Medium">
        <View style={styles.item} />
      </HoldItem>
      <HoldItem items={MenuItems}>
        <View style={styles.item} />
      </HoldItem>
      <HoldItem items={MenuItems} menuAnchorPosition="bottom-right">
        <View style={styles.item} />
      </HoldItem>
    </View>
  );
};

export default Example;
```
