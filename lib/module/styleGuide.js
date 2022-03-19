import { Dimensions } from 'react-native';
const styleGuide = {
  spacing: 8,
  dimensionWidth: Dimensions.get('screen').width,
  dimensionHeight: Dimensions.get('screen').height,
  palette: {
    primary: '#0072ff',
    secondary: '#e2e2e2',
    common: {
      white: '#fff',
      black: '#000'
    }
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20
    },
    callout: {
      fontSize: 16,
      lineHeight: 20
    },
    callout2: {
      fontSize: 14,
      lineHeight: 18
    }
  }
};
export default styleGuide;
//# sourceMappingURL=styleGuide.js.map