import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import {
  HoldItem,
  HoldMenuProvider,
  useHoldMenu,
} from 'react-native-hold-menu';

const Image = () => {
  const { handleCloseMenu } = useHoldMenu();

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      Alert.alert('Single tap!');
    });

  return (
    <HoldItem
      items={[{ text: 'Action one' }]}
      previewComponent={
        <GestureDetector gesture={singleTap}>
          <Pressable
            onPress={() => {
              Alert.alert('sss');
            }}
            style={{
              width: '100%',
              height: '100%',
              minWidth: 200,
              minHeight: 200,
              backgroundColor: 'green',
            }}
          />
        </GestureDetector>
      }
    >
      <Pressable
        onPress={() => {
          console.log('press');
        }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'red',
        }}
      />
    </HoldItem>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HoldMenuProvider previewEnabled>
        <Image />
        <Text style={{ backgroundColor: 'green' }}>
          Open up App.tsx to start working on your app!
        </Text>
      </HoldMenuProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 300,
    paddingLeft: 100,
  },
});
