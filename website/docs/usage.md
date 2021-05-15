---
id: usage
title: Usage
slug: /usage
hide_table_of_contents: true
hide_title: true
---

## Usage

### Provider

Before using Hold Menu in your application, you need to wrap your app with `HoldMenuProvider` first.

```tsx
import React from 'react';

import { HoldMenuProvider } from 'react-native-hold-menu';

const App = () => {
  return (
    <HoldMenuProvider theme="light">
      {/* Your app components */}
    </HoldMenuProvider>
  );
};

export default App;
```

### Icons

If you want to use icon in your menu items, you need to set you Icon component to HoldMenuProvider to be able to use it. And than you can set just name of the icon in menu item list with `icon` prop like below.

:::note
Icon can be used with just **react-native-vector-icons** for now.
:::

```tsx
import FeatherIcon from 'react-native-vector-icons/Feather';

/* ... */
<HoldMenuProvider iconComponent={FeatherIcon} theme="light">

```

### Wrapper

Now you can wrap your components with `HoldItem`. You need to set [items](/react-native-hold-menu/docs/props#items) prop and also see other optional props for your menu.

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
      <HoldItem items={MenuItems}>
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
