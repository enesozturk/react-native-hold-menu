import { StyleSheet } from 'react-native';
import { MENU_WIDTH } from '../../constants';
import { MenuItemHeight } from '../../utils/calculations';
import styleGuide from '../../styleGuide';

const styles = StyleSheet.create({
  menuWrapper: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: MENU_WIDTH,
    borderRadius: styleGuide.spacing * 1.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 15,
  },
  menuItem: {
    width: '100%',
    height: MenuItemHeight(),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: styleGuide.spacing * 2,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    ...styleGuide.typography.callout,
    textAlign: 'left',
    width: '100%',
    flex: 1,
  },
  menuItemTitleText: {
    ...styleGuide.typography.callout2,
    textAlign: 'center',
    width: '100%',
    flex: 1,
  },
  textDark: {
    color: 'black',
  },
  textLight: {
    color: 'white',
  },
});

export default styles;
