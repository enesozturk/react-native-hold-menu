import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

type Orientation = 'landscape' | 'portrait';

function useDeviceOrientation() {
  const { width, height } = useWindowDimensions();
  const deviceOrientation = useMemo<Orientation>(() => height >= width ? 'portrait' : 'landscape', [width, height]);
  return deviceOrientation;
}

export default useDeviceOrientation;
