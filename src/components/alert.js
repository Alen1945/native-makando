import React from 'react';
import {Alert} from 'react-native';
const alert = (success, msg, pressOK) => {
  Alert.alert(success ? 'Success' : 'Error', msg, [
    {text: 'Ok', onPress: pressOK},
  ]);
};
export default alert;
