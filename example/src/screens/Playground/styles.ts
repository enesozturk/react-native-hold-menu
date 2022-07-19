import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../../constants';
import StyleGuide from '../../utilities/styleGuide';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: { flex: 1, justifyContent: 'space-between' },
  column: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: StyleGuide.spacing * 2,
    padding: StyleGuide.spacing * 4,
    paddingVertical: StyleGuide.spacing * 2,
  },
  footer: {
    borderTopWidth: 2,
    paddingBottom: StyleGuide.spacing * 2,
  },
  item: {
    width: WINDOW_WIDTH / 5,
    height: WINDOW_WIDTH / 5,
    paddingVertical: StyleGuide.spacing,
    borderRadius: StyleGuide.spacing * 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  topRight: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  topLeft: {
    position: 'absolute',
    top: -5,
    left: -5,
  },
  topCenter: {
    position: 'absolute',
    top: -5,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: -5,
    left: -5,
  },
  bottomCenter: {
    position: 'absolute',
    bottom: -5,
  },
});

export default styles;
