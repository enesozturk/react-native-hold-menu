---
id: props
title: Props
slug: /props
---

## HoldMenuProvider

`HoldMenuProvider` is now a pure provider and overlay host. It does **not** wrap `GestureHandlerRootView`.

### `iconComponent`

If you want to use icons in your menu items, pass your icon component to `HoldMenuProvider`.

:::note
Any icon component that accepts a `name` prop can be used.
:::

```tsx
import FeatherIcon from '@expo/vector-icons/Feather';

<HoldMenuProvider iconComponent={FeatherIcon}>
```

### `theme`

Use `theme` to force a specific menu theme or sync the menu with your app theme.

Values:

| value | default |
| ----- | ------- |
| light | true    |
| dark  | false   |

```tsx
<HoldMenuProvider theme="dark">
```

### `safeAreaInsets`

Set safe area inset values to prevent the menu from opening under unsafe areas.

```tsx
const safeAreaInsets = useSafeAreaInsets();
<HoldMenuProvider safeAreaInsets={safeAreaInsets} />;
```

### `onOpen`

Fires when the menu opens.

```tsx
const onOpen = useCallback(() => {
  console.log('App onOpen');
}, []);

<HoldMenuProvider onOpen={onOpen} />;
```

### `onClose`

Fires when the menu closes.

```tsx
const onClose = useCallback(() => {
  console.log('App onClose');
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
| onPress       | function | NO       |
| isTitle       | boolean  | NO       |
| isDestructive | boolean  | NO       |
| withSeparator | boolean  | NO       |

```tsx
<HoldItem
  items={[
    { text: 'Actions', isTitle: true },
    { text: 'Action 1', onPress: () => {} },
    { text: 'Action 2', isDestructive: true, icon: 'trash', onPress: () => {} },
  ]}
/>
```

### `actionParams`

Use this to pass parameters to item `onPress` handlers without changing the shared-value payload shape.

```tsx
const items = [
  { text: 'Reply', onPress: messageId => {} },
  { text: 'Copy', onPress: (messageText, index) => {} },
];

<HoldItem
  items={items}
  actionParams={{
    Reply: ['dd443224-7f43'],
    Copy: ['Hello World!', 1],
  }}
>
  <View />
</HoldItem>;
```

### `activateOn`

Controls how the menu opens.

| type                            | default | required |
| ------------------------------- | ------- | -------- |
| tap <br/> double-tap <br/> hold | hold    | NO       |

```tsx
<HoldItem activateOn="double-tap" />
```

### `hapticFeedback`

Controls the haptic feedback style used on activation.

| value                                                                                                               | default  | required |
| ------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| "None" <br/> "Selection" <br/> "Light" <br/> "Medium" <br/> "Heavy" <br/> "Success" <br/> "Warning" <br/> "Error" | "Medium" | NO       |

```tsx
<HoldItem hapticFeedback="Heavy" />
```

### `menuAnchorPosition`

Menu anchor position is calculated automatically. Override it by passing an anchor position.

| value                                                                                                                  | required |
| ---------------------------------------------------------------------------------------------------------------------- | -------- |
| "top-center" <br/> "top-left" <br/> "top-right" <br/> "bottom-center" <br/> "bottom-left" <br/> "bottom-right"       | NO       |

```tsx
<HoldItem menuAnchorPosition="top-center" />
```

### `bottom`

If you want automatic bottom anchoring, set `bottom`.

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

```tsx
<HoldItem bottom />
```

### `disableMove`

Disable moving the held item while the menu is open.

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

```tsx
<HoldItem disableMove />
```

### `containerStyles`

Container styles for the held item. Useful for variable width or message bubbles.

| type                     | default | required |
| ------------------------ | ------- | -------- |
| ViewStyle \| ViewStyle[] | {}      | NO       |

```tsx
<HoldItem
  containerStyles={{
    position: 'relative',
    maxWidth: '80%',
  }}
/>
```

### `closeOnTap`

Set `true` if tapping the active item should close the menu.

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

```tsx
<HoldItem closeOnTap />
```

### `longPressMinDurationMs`

Delay before a long press activates the menu.

| type   | default | required |
| ------ | ------- | -------- |
| number | 150     | NO       |

```tsx
<HoldItem longPressMinDurationMs={250} />
```
