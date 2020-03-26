import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailItemScreen from '../../screens/Items/DetailItem';
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
    </Stack.Navigator>
  );
}

export default DetailScreens;
