import React from 'react';
import {View, Text, Image, Button} from 'react-native';
export default function Splash(props) {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('MainRoutes');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../icons/logo.png')}
        width="auto"
        height="auto"
      />
      <Image
        source={require('../../../icons/BackProfile.png')}
        width="90%"
        height="auto"
      />
    </View>
  );
}
