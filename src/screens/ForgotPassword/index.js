import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Input, Button, Overlay} from 'react-native-elements';
import {useFormik} from 'formik';
import alert from '../../components/alert';
import * as Yup from 'yup';
import submitData from '../../helpers/submitData';
import {ScrollView} from 'react-native-gesture-handler';
export default function ForgotPassword(props) {
  const [isAccountExists, setIsAccountExists] = React.useState(false);
  const [codeVerify, setCodeVerify] = React.useState('');
  const formCheckUsername = useFormik({
    initialValues: {username: ''},
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
    }),
    onSubmit: async values => {
      try {
        const response = await submitData('/forgot-password', values);
        if (response.data && response.data.success) {
          setCodeVerify(response.data.code_verify);
          console.log(response.data);
        } else {
          alert(response.data.success, response.data.msg);
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        alert(err.response.data.success, err.response.data.msg);
      }
    },
  });
  const formResetPassword = useFormik({
    initialValues: {code_verify: '', new_password: '', confirm_password: ''},
    validationSchema: Yup.object({
      code_verify: Yup.string().required('This Field Require'),
      new_password: Yup.string()
        .min(8, 'Username have 8 character or more')
        .required('This Field Require'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'Confirm Password Not Match')
        .required('This Field Require'),
    }),
    onSubmit: async values => {
      try {
        const response = await submitData(
          '/change-password?code=' + values.code_verify,
          values,
        );
        if (response.data && response.data.success) {
          alert(response.data.success, response.data.msg, () =>
            props.navigation.navigate('Login'),
          );
        } else {
          alert(response.data.success, response.data.msg);
        }
      } catch (e) {
        alert(e.response.data.success, e.response.data.msg);
        console.log(e);
      }
    },
  });
  return (
    <View style={{padding: 20, flex: 1, backgroundColor: '#fff'}}>
      {!isAccountExists && (
        <>
          <Overlay
            isVisible={codeVerify.length > 0}
            windowBackgroundColor="rgba(0,0, 0, .3)"
            overlayBackgroundColor="#fff"
            overlayStyle={{
              width: '90%',
              height: 300,
              padding: 10,
              paddingHorizontal: 35,
              borderRadius: 15,
              justifyContent: 'center',
            }}>
            <ScrollView
              justifyContent="center"
              showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#666',
                  marginBottom: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Copy This Code To Reset Your Password
              </Text>
              <Text
                selectable
                style={{
                  fontSize: 16,
                  color: '#444',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  textAlign: 'center',
                  padding: 5,
                  marginBottom: 20,
                }}>
                {codeVerify}
              </Text>
              <View style={{alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={() => setIsAccountExists(true)}>
                  <Text
                    style={{
                      color: '#FFF',
                      backgroundColor: '#eb4034',
                      padding: 4,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}>
                    Create New Password
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Overlay>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={require('../../../icons/forgot.png')}
              style={{marginBottom: 20}}
            />
            <Input
              value={formCheckUsername.values.username}
              errorMessage={formCheckUsername.errors.username}
              onChangeText={formCheckUsername.handleChange('username')}
              placeholder="Username"
              inputStyle={{paddingHorizontal: 18}}
              containerStyle={{
                marginBottom: 25,
              }}
              inputContainerStyle={{
                height: 50,
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 50,
              }}
            />
            <Button
              type="solid"
              buttonStyle={{backgroundColor: '#ed574e'}}
              titleStyle={{fontSize: 16, fontWeight: 'bold'}}
              raised={true}
              onPress={() => formCheckUsername.handleSubmit()}
              title="Request Code Reset"
            />
          </View>
        </>
      )}
      {isAccountExists && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#fff'}}>
          <Image
            source={require('../../../icons/changePass.png')}
            style={{marginBottom: 20}}
          />
          <Input
            value={formResetPassword.values.code_verify}
            errorMessage={formResetPassword.errors.code_verify}
            onChangeText={formResetPassword.handleChange('code_verify')}
            placeholder="Code Verify"
            inputStyle={{paddingHorizontal: 18}}
            containerStyle={{
              marginBottom: 25,
            }}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#444',
              borderRadius: 50,
            }}
          />
          <Input
            secureTextEntry
            value={formResetPassword.values.new_password}
            errorMessage={formResetPassword.errors.new_password}
            onChangeText={formResetPassword.handleChange('new_password')}
            placeholder="New Password"
            inputStyle={{paddingHorizontal: 18}}
            containerStyle={{
              marginBottom: 25,
            }}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#444',
              borderRadius: 50,
            }}
          />
          <Input
            secureTextEntry
            value={formResetPassword.values.confirm_password}
            errorMessage={formResetPassword.errors.confirm_password}
            onChangeText={formResetPassword.handleChange('confirm_password')}
            placeholder="Confirm Password"
            inputStyle={{paddingHorizontal: 18}}
            containerStyle={{
              marginBottom: 25,
            }}
            inputContainerStyle={{
              height: 50,
              borderWidth: 1,
              borderColor: '#444',
              borderRadius: 50,
            }}
          />
          <Button
            type="solid"
            buttonStyle={{backgroundColor: '#ed574e'}}
            titleStyle={{fontSize: 16, fontWeight: 'bold'}}
            raised={true}
            onPress={() => formResetPassword.handleSubmit()}
            containerStyle={{marginBottom: 20}}
            title="Reset Password"
          />
        </ScrollView>
      )}
    </View>
  );
}
