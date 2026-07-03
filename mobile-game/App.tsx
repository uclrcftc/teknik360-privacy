import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Game2048 from './src/Game2048';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#faf8ef' }}>
        <Game2048 />
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
