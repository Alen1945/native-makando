import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {ActionLogin} from '../../../store/actions/actionsUserData';
import alert from '../../../components/alert';

function FormLogin(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validationSchema={Yup.object({
        username: Yup.string().required('This Field Is Required'),
        password: Yup.string().required('This Field is Required'),
      })}
      onSubmit={async values => {
        try {
          const response = await dispatch(ActionLogin(values));
          if (!response.data.success) {
            alert(response.data.success, response.data.msg);
          }
        } catch (err) {
          alert(err.response.data.success, err.response.data.msg);
        }
      }}>
      {formikProps => (
        <>
          <Input
            autofocus
            placeholder="username"
            value={formikProps.values.username}
            errorMessage={formikProps.errors.username}
            onChangeText={formikProps.handleChange('username')}
            leftIcon={<Icon name="user" color="#333" size={18} />}
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
            value={formikProps.values.password}
            errorMessage={formikProps.errors.password}
            onChangeText={formikProps.handleChange('password')}
            placeholder="password"
            leftIcon={<Icon name="key" color="#333" size={18} />}
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
            buttonStyle={{backgroundColor: '#ed574e', width: 200, height: 50}}
            titleStyle={{fontSize: 16, fontWeight: 'bold'}}
            raised={true}
            onPress={() => formikProps.handleSubmit()}
            containerStyle={{marginBottom: 20}}
            title="LogIn"
          />
        </>
      )}
    </Formik>
  );
}

export default FormLogin;
