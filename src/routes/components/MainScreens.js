import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Items from '../../screens/Items';
import Restaurants from '../../screens/Restaurants';
import Profile from '../../screens/Profile';

import Icon from 'react-native-vector-icons/FontAwesome5';
function MainScreens(props) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Items':
              iconName = 'layer-group';
              break;
            case 'Restaurants':
              iconName = 'store-alt';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              break;
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#f54251',
        inactiveTintColor: '#bababa',
        showLabel: false,
        style: {
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Items"
        component={Items}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Restaurants"
        component={Restaurants}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default MainScreens;
