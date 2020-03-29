import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, Button} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import submitData from '../../helpers/submitData';
import alert from '../../components/alert';
import {Spinner} from 'native-base';
export default function RegisterScreen(props) {
  const msgRequired = 'This is Required';
  const [isLoading, setIsLoading] = React.useState(false);
  const formRegister = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Username have 6 character or more')
        .required(msgRequired),
      password: Yup.string()
        .min(8, 'Password have 8 character or more')
        .required(msgRequired),
      email: Yup.string()
        .email('Invalid email address')
        .required(msgRequired),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm Password Not Match')
        .required(msgRequired),
    }),
    onSubmit: async (values, form) => {
      try {
        setIsLoading(true);
        const response = await submitData('/register', values);
        console.log(response.data);
        if (response.data && response.data.success) {
          form.setSubmitting(false);
          form.resetForm();
          alert(response.data.success, response.data.msg, () =>
            props.navigation.navigate('AccountVerify'),
          );
        } else {
          alert(response.data.success, response.data.msg);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert(err.response.data.success, err.response.data.msg);
      }
    },
  });

  return (
    <>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 10,
          flex: 1,
          backgroundColor: '#fff',
        }}>
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
              fontSize: 25,
              color: '#ed574e',
            }}>
            Register To Our App
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, paddingHorizontal: 25, flexWrap: 'wrap'}}>
            <Input
              focus
              placeholder="username"
              value={formRegister.values.username}
              errorMessage={formRegister.errors.username}
              onChangeText={formRegister.handleChange('username')}
              leftIcon={<Icon name="user" color="#333" size={18} />}
              inputStyle={{paddingHorizontal: 18}}
              inputContainerStyle={{
                height: 50,
                borderWidth: 1,
                borderColor: '#666',
                borderRadius: 50,
                marginBottom: 15,
              }}
            />
            <Input
              placeholder="email"
              value={formRegister.values.email}
              errorMessage={formRegister.errors.email}
              onChangeText={formRegister.handleChange('email')}
              leftIcon={<Icon name="envelope" color="#333" size={18} />}
              inputStyle={{paddingHorizontal: 18}}
              inputContainerStyle={{
                height: 50,
                borderWidth: 1,
                borderColor: '#666',
                borderRadius: 50,
                marginBottom: 15,
              }}
            />
            <Input
              secureTextEntry
              placeholder="password"
              value={formRegister.values.password}
              errorMessage={formRegister.errors.password}
              onChangeText={formRegister.handleChange('password')}
              leftIcon={<Icon name="key" color="#333" size={18} />}
              inputStyle={{paddingHorizontal: 18}}
              inputContainerStyle={{
                height: 50,
                borderWidth: 1,
                borderColor: '#666',
                borderRadius: 50,
                marginBottom: 15,
              }}
            />
            <Input
              secureTextEntry
              placeholder="confirm password"
              value={formRegister.values.confirm_password}
              errorMessage={formRegister.errors.confirm_password}
              onChangeText={formRegister.handleChange('confirm_password')}
              leftIcon={<Icon name="check-square" color="#333" size={18} />}
              inputStyle={{paddingHorizontal: 20}}
              inputContainerStyle={{
                height: 50,
                borderWidth: 1,
                borderColor: '#666',
                borderRadius: 50,
                marginBottom: 20,
              }}
            />
            <TouchableOpacity>
              <Button
                type="solid"
                onPress={() => formRegister.handleSubmit()}
                buttonStyle={{backgroundColor: '#ed574e', height: 50}}
                titleStyle={{fontSize: 16, fontWeight: 'bold'}}
                raised={true}
                containerStyle={{marginBottom: 25}}
                title="Register"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 25,
            }}>
            <Text style={{fontSize: 15, color: '#666'}}>
              Already Have Account?&nbsp;&nbsp;
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={{fontSize: 15, color: '#666', fontWeight: 'bold'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.4)',
          }}>
          <Spinner color="blue" />
        </View>
      )}
    </>
  );
}
