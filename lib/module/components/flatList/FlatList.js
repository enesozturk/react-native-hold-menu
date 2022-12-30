function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import { FlatList as RNFlatList } from 'react-native';
import isEqual from 'lodash.isequal';
import Animated from 'react-native-reanimated';
const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

const HoldMenuFlatListComponent = props => {
  return /*#__PURE__*/React.createElement(AnimatedFlatList, _extends({}, props, {
    scrollEventThrottle: 16
  }));
};

const HoldMenuFlatList = /*#__PURE__*/memo(HoldMenuFlatListComponent, isEqual);
export default HoldMenuFlatList;
//# sourceMappingURL=FlatList.js.map