import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailItemScreen from '../../screens/Items/DetailItem';
import DetailCartScreen from '../../screens/Carts/DetailCart';
function DetailScreens(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DetailItem"
        component={DetailItemScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailCart"
        component={DetailCartScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default DetailScreens;
