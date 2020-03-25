import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, Button} from 'react-native-elements';
export default function RegisterScreen() {
  return (
    <View style={{paddingTop: 20, paddingHorizontal: 10, flex: 1}}>
      <View style={{height: 250, marginBottom: 15, alignItems: 'center'}}>
        <Image
          source={require('../../../icons/register1.png')}
          style={{width: 180, height: 180, marginBottom: 15}}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#233333',
            fontSize: 28,
            color: '#ed574e',
          }}>
          Register To Our App
        </Text>
      </View>
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 25, flexWrap: 'wrap'}}>
          <Input
            focus
            placeholder="username"
            leftIcon={<Icon name="user" color="#333" size={18} />}
            inputStyle={{paddingHorizontal: 18}}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 50,
              marginBottom: 15,
            }}
          />
          <Input
            placeholder="email"
            leftIcon={<Icon name="envelope" color="#333" size={18} />}
            inputStyle={{paddingHorizontal: 18}}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 50,
              marginBottom: 15,
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
              borderColor: '#fff',
              borderRadius: 50,
              marginBottom: 15,
            }}
          />
          <Input
            secureTextEntry
            placeholder="confirm password"
            leftIcon={<Icon name="check-square" color="#333" size={18} />}
            inputStyle={{paddingHorizontal: 20}}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 50,
              marginBottom: 20,
            }}
          />
          <Button
            type="solid"
            buttonStyle={{backgroundColor: '#ed574e', height: 50}}
            titleStyle={{fontSize: 16, fontWeight: 'bold'}}
            raised={true}
            containerStyle={{marginBottom: 10}}
            title="Register"
          />
        </View>
      </ScrollView>
    </View>
  );
}
