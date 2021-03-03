---
id: props
title: Props
slug: /props
---

## Configuration

### `items`

Array of menu items.

| name    | type                          | required |
| ------- | ----------------------------- | -------- |
| title   | string                        | YES      |
| icon    | () => React.ReactNode \| null | NO       |
| onPress | function                      | YES      |

#### Example

```tsx
<HoldItem
  items={[
    { text: 'Action 1', icon: null, onPress: () => {} },
    { text: 'Action 2', icon: null, onPress: () => {} },
  ]}
/>
```

### `menuAnchorPosition`

Menu anchor position is calculated automaticly. But you can override the calculation by passing an anchor position.
Auto calculation will be "top-left", "top-center" or "top-right". If you want to open menu from bottom, you need to use
"bottom-left", "bottom-center" or "bottom-right". Or if you want to use auto calculation for bottom, see [`bottom`](#bottom) prop.

| type                                                                                           | required |
| ---------------------------------------------------------------------------------------------- | -------- |
| "top-center" \| "top-left" \| "top-right"\| "bottom-center" \| "bottom-left" \| "bottom-right" | NO       |

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

### `disableMove`

You may need disable move of holded item for your example. Set it true.

| type    | default | required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

### `styles`

Hold item container styles. You may need **dynamic width or hight** for some examples like message boxes. See Whatsapp example.

| type                      | default | required |
| ------------------------- | ------- | -------- |
| ViewStyle \| ViewStyle[]; | {}      | NO       |

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
