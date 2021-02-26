import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { HoldItem } from 'react-native-hold-menu';

import styles from './styles';
import { useAppContext } from '../../hooks/useAppContext';
import StyleGuide from '../../utilities/styleGuide';
import Icon from 'react-native-vector-icons/Feather';

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  const { theme } = useAppContext();

  // [TODO]: MenuItem does not render icon
  const items = useMemo(
    () => [
      {
        title: 'Action 1',
        icon: () => (
          <Icon
            name="star"
            size={18}
            color={theme == 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {
          console.log('[ACTION]: Action 1');
        },
      },
      {
        title: 'Action 2',
        icon: () => (
          <Icon
            name="smile"
            size={18}
            color={theme == 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {
          console.log('[ACTION]: Action 2');
        },
      },
      {
        title: 'Action 3',
        onPress: () => {
          console.log('[ACTION]: Action 3');
        },
      },
      {
        title: 'Action 4',
        onPress: () => {
          console.log('[ACTION]: Action 4');
        },
      },
    ],
    [theme]
  );

  const themeStyles = useMemo(() => {
    return {
      containerStyles: [
        styles.container,
        { backgroundColor: StyleGuide.palette[theme].backgroundColor },
      ],
      item: [
        styles.item,
        { backgroundColor: StyleGuide.palette[theme].primary },
      ],
      dot: [
        styles.dot,
        { backgroundColor: StyleGuide.palette[theme].primaryDark },
      ],
      footer: [
        styles.footer,
        { borderColor: StyleGuide.palette[theme].secondary },
      ],
    };
  }, [theme]);

  return (
    <View style={themeStyles.containerStyles}>
      <View style={[styles.column, styles.content]}>
        <View style={[styles.row]}>
          <HoldItem items={items} menuAnchorPosition="bottom-left">
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.bottomLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
        <View style={[styles.row]}>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      <View style={[themeStyles.footer, styles.row]}>
        <HoldItem menuAnchorPosition="bottom-left" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-center" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-right" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View>
    </View>
  );
};

export default memo(Playground);
