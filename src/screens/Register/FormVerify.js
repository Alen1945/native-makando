import React from 'react';
import {View, Text, Button} from 'react-native';
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
    <View>
      <Input
        placeholder="Code Verify"
        value={formVerify.values.code_verify}
        errorMessage={formVerify.errors.code_verify}
        onChangeText={formVerify.handleChange('code_verify')}
        inputStyle={{paddingHorizontal: 18}}
        inputContainerStyle={{
          height: 50,
          borderWidth: 1,
          borderColor: '#fff',
          borderRadius: 50,
          marginBottom: 15,
        }}
      />
      <Button
        type="solid"
        onPress={() => formVerify.handleSubmit()}
        buttonStyle={{backgroundColor: '#ed574e', height: 50}}
        titleStyle={{fontSize: 16, fontWeight: 'bold'}}
        raised={true}
        containerStyle={{marginBottom: 25}}
        title="Verify"
      />
    </View>
  );
}
