---
id: examples
title: Examples
slug: /examples
---

:::info
If you want to see full examples in your phone or simulator, you can clone [this showcase project](https://github.com/enesozturk/react-native-hold-menu-expo-example) and run in seconds with Expo 🔥
:::

## Configuring List

### Sample List

**Code**

```js
<HoldItem
  items={[
    { text: 'Reply', onPress: () => {} },
    { text: 'Edit', onPress: () => {} },
    { text: 'Delete', onPress: () => {} },
  ]}
/>
```

**Result**

![list-simple](/img/examples/list-simple.png)

### List with title

**Code**

```js
<HoldItem
  items={[
    { text: 'Actions', isTitle: true, onPress: () => {} },
    { text: 'Reply', onPress: () => {} },
    { text: 'Edit', onPress: () => {} },
    { text: 'Delete', onPress: () => {} },
  ]}
/>
```

**Result**

![list-with-title](/img/examples/list-with-title.png)

### List with separator

**Code**

```js
<HoldItem
  items={[
    { text: 'Actions', isTitle: true, onPress: () => {} },
    { text: 'Reply', onPress: () => {} },
    { text: 'Edit', onPress: () => {} },
    { text: 'Delete', withSeparator: true, onPress: () => {} },
    { text: 'Share', onPress: () => {} },
  ]}
/>
```

**Result**

![list-with-separator](/img/examples/list-with-separator.png)

### List with destructive button

**Code**

```js
<HoldItem
  items={[
    { text: 'Actions', isTitle: true, onPress: () => {} },
    { text: 'Reply', onPress: () => {} },
    { text: 'Edit', onPress: () => {} },
    {
      text: 'Delete',
      withSeparator: true,
      isDestructive: true,
      onPress: () => {},
    },
    { text: 'Share', onPress: () => {} },
  ]}
/>
```

**Result**

![list-with-destructive](/img/examples/list-with-destructive.png)

### List with icons

**Code**

```js
<HoldItem
  items={[
    { text: 'Action', isTitle: true, onPress: () => {} },
    {
      text: 'Home',
      icon: () => <Icon name="home" size={18} />,
      onPress: () => {},
    },
    {
      text: 'Edit',
      icon: () => <Icon name="edit" size={18} />,
      onPress: () => {},
    },
    {
      text: 'Delete',
      icon: () => <Icon name="delete" size={18} />,
      withSeparator: true,
      isDestructive: true,
      onPress: () => {},
    },
    {
      text: 'Share',
      icon: () => <Icon name="share" size={18} />,
      onPress: () => {},
    },
    {
      text: 'More',
      icon: () => <Icon name="more-horizontal" size={18} />,
      onPress: () => {},
    },
  ]}
/>
```

**Result**

![list-with-destructive](/img/examples/list-with-icons.png)

<!-- ## Configuring Hold Item -->

<!-- ## Menu from bottom

**Code**

```js
<HoldItem
  bottom
  items={[
    { text: 'Action', isTitle: true, onPress: () => {} },
    { text: 'Action 1', onPress: () => {} },
    { text: 'Action 2', withSeparator: true, onPress: () => {} },
    { text: 'Action 3', isDestructive: true, onPress: () => {} },
  ]}
/>
```

**Result**

![sample-menu](/img/og.png) -->
