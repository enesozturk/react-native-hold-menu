---
id: props
title: Props
slug: /props
---

## HoldMenuProvider

### `iconComponent`

If you want to use icon in your menu items, you need to set you Icon component to HoldMenuProvider to be able to use it. And than you can set just name of the icon in menu item list with `icon` prop like below.

:::note
Icon can be used with just **react-native-vector-icons** for now.
:::

```tsx
import FeatherIcon from 'react-native-vector-icons/Feather';

/* ... */
<HoldMenuProvider iconComponent={FeatherIcon}>

```

### `theme`

If you want to set spesific theme or change depends on your theme, use `theme` prop like below.

Values:

| value | default |
| ----- | ------- |
| light | true    |
| dark  | false   |

```tsx
<HoldMenuProvider theme={"dark"}>
```

### `safeAreaInsets`

Set object of safe area inset values to prevent the menu to be opened under the unsafe area

#### Example

```tsx
const safeAreaInsets = useSafeAreaProvider();
<HoldMenuProvider safeAreaInsets={safeAreaInsets} />;
```

### `onOpen`

Fires callback when menu is opened

#### Example

```tsx
const onOpen = useCallback(() => {
  console.log('App onOpen')
}, []);

<HoldMenuProvider onOpen={onOpen} />;
```

### `onClose`

Fires callback when menu is opened

#### Example

```tsx
const onClose = useCallback(() => {
  console.log('App onClose')
}, []);

<HoldMenuProvider onClose={onClose} />;
```

## HoldItem

### `items`

Array of menu items.

| name          | type     | required |
| ------------- | -------- | -------- |
| text          | string   | YES      |
| icon          | string   | NO       |
| onPress       | function | YES      |
| isTitle       | boolean  | NO       |
| isDestructive | boolean  | NO       |
| withSeparator | boolean  | NO       |

#### Example

```tsx
<HoldItem
  items={[
    { text: 'Actions', isTitle },
    { text: 'Action 1', onPress: () => {} },
    { text: 'Action 2', isDestructive, icon: 'trash', onPress: () => {} },
  ]}
/>
```

Check out the other examples [here](examples).

### `actionParams`

Object of keys that same name with items to match parameters to onPress actions. If you want to pass different parameters for HoldItem to menu item `onPress` handlers ([check WhatsApp example](https://github.com/enesozturk/react-native-hold-menu/blob/main/example/src/screens/Whatsapp/MessageItem.tsx)), you need to use this prop to set params per HoldItem.

> The reason provide action params with another prop is make it able to pass with shared value without performance issues.

| type                      | required |
| ------------------------- | -------- |
| { [name: string]: any[] } | NO       |

#### Example

```tsx
const items = [
 {text: 'Reply', onPress: (messageId) => {}},
 {text: 'Copy', onPress: (messageText, index) => {}},
]

<HoldItem
   items={items}
   actionParams={{
     Reply: ['dd443224-7f43'],
     Copy: ['Hello World!', 1]
   }}
><View/></HoldItem>
```

### `activateOn`

Type of behavior to activate menu action.

| type                            | default | required |
| ------------------------------- | ------- | -------- |
| tap <br/> double-tap <br/> hold | hold    | NO       |

#### Example

```tsx
<HoldItem activateOn="double-tap" />
```

### `hapticFeedback`

Type of haptic feedback behavior.

| value                                                                                                             | default  | required |
| ----------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| "None" <br/> "Selection" <br/> "Light" <br/> "Medium" <br/> "Heavy" <br/> "Success" <br/> "Warning" <br/> "Error" | "Medium" | NO       |

#### Example

```tsx
<HoldItem hapticFeedback="Heavy" />
```

### `menuAnchorPosition`

Menu anchor position is calculated automaticly. But you can override the calculation by passing an anchor position.
Auto calculation will be `top-left`, `top-center` or `top-right`. If you want to open menu from bottom, you need to use
`bottom-left`, `bottom-center` or `bottom-right`. Or if you want to use auto calculation for bottom, see [`bottom`](#bottom) prop.

| value                                                                                                          | required |
| -------------------------------------------------------------------------------------------------------------- | -------- |
| "top-center" <br/> "top-left" <br/> "top-right" <br/> "bottom-center" <br/> "bottom-left" <br/> "bottom-right" | NO       |

#### Example

```tsx
<HoldItem menuAnchorPosition="top-center" />
```

### `bottom`

Hold Menu automaticly calculates if you do not set [`menuAnchorPosition`](#menuanchorposition).
If you want to open menu from bottom like _Telegram bottom nav buttons in iOS_ and use auto anchor calculation,
you should set `bottom` as true.

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

#### Example

```tsx
<HoldItem menuAnchorPosition="top-center" bottom />
```

### `disableMove`

You may need disable move of holded item for your example. Set it true.

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

#### Example

```tsx
<HoldItem menuAnchorPosition="top-center" disableMove />
```

### `styles`

`HoldItem` container styles. You may need **dynamic width or hight** for some examples like message boxes. See Whatsapp example.

| type                     | default | required |
| ------------------------ | ------- | -------- |
| ViewStyle \| ViewStyle[] | {}      | NO       |

#### Example

```tsx
// For Whatsapp example
<HoldItem
  styles={{
    position: 'relative',
    maxWidth: '80%',
  }}
/>
```

### `closeOnTap`

Set true if you want to close menu when tap to HoldItem

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

#### Example

```tsx
<HoldItem closeOnTap />
```

### `longPressMinDurationMs`

Set delay before long tap will activate gesture. May be useful to increase this value in lists

| type    | default | required |
| ------- | ------- | -------- |
| number  | 150     | NO       |

#### Example

```tsx
<HoldItem longPressMinDurationMs={250} />
```
