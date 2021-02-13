# React Native Hold Menu

**react-native-hold-menu** is an easy to use hold to open context menu for your React Native projects powered by Reanimated 2 🔥

## ⚙️ Installation

To install the package;

```
$ yarn add react-native-hold-menu
```

It is done! ✅

## 🚀 How to use

```javascript
import React from "react";
import { View } from "react-native";

import { HoldMenuProvider, HoldItem } from "react-native-hold-menu";

export const MenuItems = [
  {
    title: "Edit",
    icon: null,
    onPress: () => {
      console.log("EDIT ACTION");
    },
  },
  {
    title: "Delete",
    icon: null,
    onPress: () => {
      console.log("DELETE ACTION");
    },
  },
];

export default App = () => {
  return (
     <HoldMenuProvider>
        <HoldItem id="item-1" items={MenuItems}>
            <View style={styles.item}>
        </HoldItem>
    </HoldMenuProvider>
  );
};
```

## ☝️ Options

TODO: Options will be added

#### ⭐️ Show Your Support

Please give a ⭐️ if you like this project!

#### 👏 Contributing

If you have any questions or requests or want to contribute to `react-native-hold-menu`, please write the [issue](https://github.com/enesozturk/react-native-hold-menu/issues) or give me a Pull Request freely.
