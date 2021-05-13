import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { HoldItem, HoldMenuIcon } from 'react-native-hold-menu';

import styles from './styles';
import { useAppContext } from '../../hooks/useAppContext';
import StyleGuide from '../../utilities/styleGuide';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface PlaygroundProps {}

type IconProps = {
  name: string;
};

const Icon = ({ name }: IconProps) => {
  return <HoldMenuIcon name={name} iconComponent={FeatherIcon} />;
};

const Playground = ({}: PlaygroundProps) => {
  const { theme } = useAppContext();

  const items = [
    {
      isTitle: true,
      text: 'Actions',
    },
    {
      text: 'Home',
      icon: () => <Icon name="home" />,
      onPress: () => {
        console.log('[ACTION]: Home');
      },
    },
    {
      text: 'Edit',
      icon: () => <Icon name="edit" />,
      onPress: () => {
        console.log('[ACTION]: Edit');
      },
    },
    {
      text: 'Download',
      onPress: () => {
        console.log('[ACTION]: Download');
      },
      icon: () => <Icon name="download" />,
    },
    {
      text: 'Delete',
      onPress: () => {
        console.log('[ACTION]: Delete');
      },
      icon: () => <Icon name="trash" />,
      withSeperator: true,
      isDestructive: true,
    },
    {
      text: 'Share',
      onPress: () => {
        console.log('[ACTION]: Share');
      },
      icon: () => <Icon name="share" />,
    },
    {
      text: 'More',
      onPress: () => {
        console.log('[ACTION]: More');
      },
      icon: () => <Icon name="more-horizontal" />,
    },
  ];

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
