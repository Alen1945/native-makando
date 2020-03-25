import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Login(props) {
  return (
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
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,.85)',
            position: 'absolute',
            top: 80,
            left: 40,
            right: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              flexWrap: 'wrap',
              paddingHorizontal: 25,
              marginBottom: 25,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'italic',
                color: '#444',
              }}>
              Welcome&nbsp;&nbsp;
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontStyle: 'italic',
                color: '#444',
                fontWeight: 'bold',
              }}>
              Back&nbsp;
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#444',
              }}>
              to&nbsp;
            </Text>
            <Text
              style={{
                fontSize: 28,
                color: '#444',
              }}>
              MakanDO
            </Text>
          </View>
          <Input
            focus
            placeholder="username"
            leftIcon={<Icon name="user" color="#333" size={18} />}
            inputStyle={{paddingHorizontal: 18}}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#444',
              borderRadius: 50,
              marginBottom: 25,
            }}
          />
          <Input
            secureTextEntry
            placeholder="password"
            leftIcon={<Icon name="key" color="#333" size={18} />}
            inputStyle={{paddingHorizontal: 18}}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#444',
              borderRadius: 50,
              marginBottom: 25,
            }}
          />
          <Button
            type="solid"
            buttonStyle={{backgroundColor: '#ed574e', width: 200, height: 50}}
            titleStyle={{fontSize: 16, fontWeight: 'bold'}}
            raised={true}
            containerStyle={{marginBottom: 20}}
            title="LogIn"
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text style={{fontSize: 15, color: '#666'}}>
              Dont Have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Register')}>
              <Text style={{fontSize: 15, color: '#666', fontWeight: 'bold'}}>
                &nbsp;Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
