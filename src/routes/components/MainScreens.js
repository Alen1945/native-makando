import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';
import Home from '../../screens/Home';
import Items from '../../screens/Items';
import Restaurants from '../../screens/Restaurants';
import Profile from '../../screens/Profile';
import Carts from '../../screens/Carts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {getUserCart} from '../../store/actions/actionUserCart';

function MainScreens(props) {
  const totalItems = useSelector(
    state => Object.keys(state.dataCart.itemInCart).length,
  );
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (props.route.state && props.route.state.index === 2) {
      dispatch(getUserCart());
    }
  }, [props.route.state]);
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
            case 'Carts':
              iconName = 'shopping-cart';
              return (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    width: 70,
                    height: 70,
                    top: -30,
                    borderRadius: 50,
                    elevation: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {totalItems > 0 && (
                    <Badge
                      containerStyle={{top: 0, left: 4}}
                      badgeStyle={{
                        height: 12,
                        width: 12,
                        borderRadius: 12,
                      }}
                      status="error"
                    />
                  )}
                  <Icon name={iconName} size={25} color={color} />
                </View>
              );
            default:
              iconName = 'opencart';
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
          position: 'relative',
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: true}} />
      <Tab.Screen name="Items" component={Items} />
      <Tab.Screen name="Carts" component={Carts} />
      <Tab.Screen name="Restaurants" component={Restaurants} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MainScreens;
