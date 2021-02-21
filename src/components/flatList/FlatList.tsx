import React, { memo } from 'react';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from 'react-native';

import isEqual from 'lodash.isequal';
import Animated from 'react-native-reanimated';

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

type BottomSheetFlatListProps<T> = Omit<
  RNFlatListProps<T>,
  'scrollEventThrottle'
>;

const HoldMenuFlatListComponent = (props: BottomSheetFlatListProps<any>) => {
  return <AnimatedFlatList {...props} scrollEventThrottle={16} />;
};

const HoldMenuFlatList = memo(HoldMenuFlatListComponent, isEqual);

export default HoldMenuFlatList;
