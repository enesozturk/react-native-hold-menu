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

<br/>

| Properties              | Type       | Description                                                 | Default |
| ----------------------- | ---------- | ----------------------------------------------------------- | ------- |
| **isActive**            | `bool`     | Show/Hide the panel                                         | `false` |
| **onClose**             | `Function` | Fired when the panel is closed                              |         |
| **showCloseButton**     | `bool`     | Set true if you want to show close button                   |         |
| **fullWidth**           | `bool`     | Set true if you want to make full with panel                | `false` |
| **openLarge**           | `bool`     | Set true if you want to open panel large by default         | `false` |
| **onlyLarge**           | `bool`     | Set true if you want to let panel open just large mode      | `false` |
| **onlySmall**           | `bool`     | Set true if you want to let panel open just small mode      | `false` |
| **noBackgroundOpacity** | `bool`     | Set true if you want to disable black background opacity    | `false` |
| **style**               | `Object`   | Use this prop to override panel style                       | `{}`    |
| **closeRootStyle**      | `Object`   | Use this prop to override close button background style     | `{}`    |
| **closeIconStyle**      | `Object`   | Use this prop to override close button icon style           | `{}`    |
| **barStyle**            | `Object`   | Use this prop to override bar style                         | `{}`    |
| **closeOnTouchOutside** | `bool`     | Set true if you want to close panel by touching outside     | `false` |
| **allowTouchOutside**   | `bool`     | Set true if you want to make toucable outside of panel      | `false` |
| **noBar**               | `bool`     | Set true if you want to remove gray bar                     | `false` |
| **scrollViewProps**     | `Object`   | Use this prop to override scroll view that inside the panel | `{}`    |

#### ⭐️ Show Your Support

Please give a ⭐️ if you like this project!

#### 👏 Contributing

If you have any questions or requests or want to contribute to `react-native-hold-menu`, please write the [issue](https://github.com/enesozturk/react-native-hold-menu/issues) or give me a Pull Request freely.
