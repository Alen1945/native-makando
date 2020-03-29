import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {Input} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import getData from '../../helpers/getData';
import alert from '../../components/alert';
export default function VerifyAccount(props) {
  const formVerify = useFormik({
    initialValues: {
      code_verify: '',
    },
    validationSchema: Yup.object({
      code_verify: Yup.string().required('Code Verify is Required'),
    }),
    onSubmit: async (values, form) => {
      try {
        const response = await getData('/verify?code=' + values.code_verify);
        console.log(response.data);
        if (response.data && response.data.success) {
          form.setSubmitting(false);
          form.resetForm();
          alert(response.data.success, response.data.msg, () =>
            props.navigation.navigate('Login'),
          );
        } else {
          alert(response.data.success, response.data.msg);
        }
      } catch (err) {
        alert(err.response.data.success, err.response.data.msg);
      }
    },
  });
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        height="auto"
        width="auto"
        style={{marginBottom: 20}}
        source={require('../../../icons/verify.png')}
      />
      <Input
        placeholder="Code Verify"
        value={formVerify.values.code_verify}
        errorMessage={formVerify.errors.code_verify}
        onChangeText={formVerify.handleChange('code_verify')}
        inputStyle={{paddingHorizontal: 18}}
        inputContainerStyle={{
          height: 50,
          borderWidth: 1,
          borderColor: '#666',
          borderRadius: 50,
          marginBottom: 15,
        }}
      />
      <View style={{width: 200}}>
        <Button
          type="solid"
          onPress={() => formVerify.handleSubmit()}
          color="#ed574e"
          titleStyle={{fontSize: 16, fontWeight: 'bold'}}
          raised={true}
          containerStyle={{marginBottom: 25}}
          title="Verify"
        />
      </View>
    </View>
  );
}
