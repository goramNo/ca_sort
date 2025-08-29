import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/features/home/HomeScreen';
import ProposerScreen from './src/features/proposals/ProposerScreen';
import type { Mood } from './src/shared/types/mood';

export type RootStackParamList = {
  Home: undefined;
  Proposer: { mood?: Mood } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0b0c' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#0b0b0c' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ça Sort !' }} />
        <Stack.Screen name="Proposer" component={ProposerScreen} options={{ title: 'Proposer' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
