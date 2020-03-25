import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
export default function Guest(props) {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
        }}>
        <ImageBackground
          style={{width: '100%', flex: 1, height: '100%'}}
          source={require('../../../icons/background.png')}
        />
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <View
            style={{
              height: 450,
              padding: 15,
              borderRadius: 30,
              paddingTop: 40,
              paddingBottom: 50,
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,.75)',
              position: 'absolute',
              top: 80,
              left: 40,
              right: 40,
              shadowColor: 'rgba(0,0,0)',
            }}>
            <Image
              source={require('../../../icons/logo.png')}
              style={{marginBottom: 40}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                flexWrap: 'wrap',
                paddingHorizontal: 25,
                marginBottom: 50,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontStyle: 'italic',
                  color: '#444',
                }}>
                Get&nbsp;&nbsp;
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontStyle: 'italic',
                  color: '#444',
                  fontWeight: 'bold',
                }}>
                Freshness&nbsp;&nbsp;
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontStyle: 'italic',
                  color: '#444',
                }}>
                delivered&nbsp;
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: '#444',
                }}>
                at&nbsp;
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontStyle: 'italic',
                  color: '#444',
                }}>
                your
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#444',
                  fontWeight: 'bold',
                }}>
                &nbsp;&nbsp;Doorstep
              </Text>
            </View>
            <Button
              title="Create Account"
              type="solid"
              onPress={() => props.navigation.navigate('Register')}
              containerStyle={{
                shadowColor: 'rgba(0,0,0,0.00123)',
                borderWidth: 0.5,
                padding: 0,
                marginBottom: 40,
              }}
              buttonStyle={{
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 10,
                width: 200,
                height: 60,
              }}
              titleStyle={{color: '#454545', fontSize: 17}}
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text style={{fontSize: 15, color: '#666'}}>
                Already Have Account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={{fontSize: 15, color: '#666', fontWeight: 'bold'}}>
                  &nbsp;Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
