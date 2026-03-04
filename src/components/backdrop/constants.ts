import { IS_IOS } from '../../constants';

// Use a visible semi-opaque layer so backdrop is always tappable and visible (e.g. iOS simulator blur can be faint).
export const BACKDROP_LIGHT_BACKGROUND_COLOR = IS_IOS
  ? 'rgba(0,0,0,0.4)'
  : 'rgba(19, 19, 19, 0.95)';
export const BACKDROP_DARK_BACKGROUND_COLOR = IS_IOS
  ? 'rgba(0,0,0,0.75)'
  : 'rgba(0,0,0,0.95)';
