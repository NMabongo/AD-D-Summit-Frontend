import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import homeScreen from '../(tabs)';
import RegistrationScreen from '../(tabs)/registrationScreen';

export type RootStackParamList = {
  homeScreen: undefined;
  RegistrationScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="homeScreen" component={homeScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}