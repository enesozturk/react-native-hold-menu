import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

function getWindowOrientation() {
  const {
    width,
    height
  } = Dimensions.get('window');
  return height >= width ? 'portrait' : 'landscape';
}

function useDeviceOrientation() {
  const [deviceOrientation, setDeviceOrientation] = useState(getWindowOrientation);
  useEffect(() => {
    function updateState() {
      setDeviceOrientation(getWindowOrientation());
    }

    Dimensions.addEventListener('change', updateState);
    return () => Dimensions.removeEventListener('change', updateState);
  }, []);
  return deviceOrientation;
}

export default useDeviceOrientation;
//# sourceMappingURL=useDeviceOrientation.js.map