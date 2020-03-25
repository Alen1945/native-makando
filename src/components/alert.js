import React from 'react';
import {Alert} from 'react-native';
const alert = (success, msg) => {
  Alert.alert(success ? 'Success' : 'Error', msg, [
    {text: 'Ok', onPress: () => {}, style: 'cancel'},
  ]);
};
export default alert;
