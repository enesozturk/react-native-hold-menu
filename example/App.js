import 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainApp from './src/App';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}
