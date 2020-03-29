import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreens from './components/MainScreens';
import DetailScreen from './components/DetailScreens';
function PrivateRoute(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainScreens} />
      <Stack.Screen name="DetailScreens" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default PrivateRoute;
