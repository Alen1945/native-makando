import React from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Splash from '../screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {actionLogout} from '../store/actions/actionsUserData';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';

function MainRoutes(props) {
  const dispatch = useDispatch();
  const {isLogin, token} = useSelector(state => state.dataUser);
  if (isLogin && token) {
    const payload = jwt_decode(token);
    if (new Date(payload.exp * 1000).getTime() - new Date().getTime() <= 0) {
      return dispatch(actionLogout());
    }
    return <PrivateRoute />;
  } else {
    return <PublicRoute />;
  }
}
function Routes(props) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainRoutes" component={MainRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
