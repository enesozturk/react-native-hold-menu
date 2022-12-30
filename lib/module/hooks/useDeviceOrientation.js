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
  const [deviceOrientation, setDeviceOrientation] = useState(getWindowOrientation());
  useEffect(() => {
    function updateState() {
      setDeviceOrientation(getWindowOrientation());
    }

    const changeEvent = Dimensions.addEventListener('change', updateState); // @ts-ignore

    return () => changeEvent.remove();
  }, []);
  return deviceOrientation;
}

export default useDeviceOrientation;
//# sourceMappingURL=useDeviceOrientation.js.map