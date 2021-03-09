import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  holdItem: { zIndex: 10, position: 'absolute' },
  portalOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 15,
  },
});

export default styles;
