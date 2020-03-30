import React from 'react';
import {View, Text, Image, Button} from 'react-native';
export default function Splash(props) {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('MainRoutes');
    }, 2000);
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../icons/backsplash.png')}
          style={{marginTop: -50, width: 400, height: 200}}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,.5)',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Image
          source={require('../../../icons/BackProfile.png')}
          style={{
            width: 100,
            resizeMode: 'center',
            marginVertical: 0,
            height: 200,
            marginTop: 100,
          }}
        />
        <Image
          source={require('../../../icons/logo.png')}
          style={{
            width: 300,
            resizeMode: 'center',
            marginVertical: 0,
            height: 100,
            position: 'absolute',
            bottom: 30,
          }}
        />
      </View>
    </>
  );
}
