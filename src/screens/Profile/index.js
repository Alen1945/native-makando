import React from 'react';
import {Text, View} from 'react-native';
import {Avatar, TextInput, Input, Button, Picker} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {API_URL} from 'react-native-dotenv';
import alert from '../../components/alert';
import {useFormik} from 'formik';
import {
  setUserProfile,
  ActionLogout,
} from '../../store/actions/actionsUserData';
import submitData from '../../helpers/submitData';
import * as Yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';

export default function Profile(props) {
  const {dataProfile} = useSelector(state => state.dataUser);
  const dispatch = useDispatch();

  const formTopUp = useFormik({
    enableReinitialize: true,
    initialValues: {nominal_topup: 0},
    validationSchema: Yup.object({nominal_topup: Yup.number().required()}),
    onSubmit: async (values, form) => {
      try {
        console.log(values);
        const response = await submitData('/topup', values);
        if (response.data && response.data.success) {
          dispatch(setUserProfile());
          form.setSubmitting(false);
          form.resetForm();
        }
        alert(response.data.success, response.data.msg);
      } catch (err) {
        alert(err.response.data.success, err.response.data.msg);
      }
    },
  });
  return (
    <View style={{flex: 1, paddingVertical: 30, paddingHorizontal: 15}}>
      <ScrollView>
        <View
          style={{
            height: 100,
            backgroundColor: '#eee',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            title={dataProfile.username.substring(0, 1)}
            size={90}
            source={{uri: `${API_URL}/${dataProfile.picture}`}}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 15}}>{dataProfile.username}</Text>
          </View>
        </View>
        <View>
          <Text>Saldo: {dataProfile.balance}</Text>
          <Text>{dataProfile.address}</Text>
        </View>
        <View>
          <Input
            keyboardType="numeric"
            value={`${formTopUp.values.nominal_topup}`}
            placeholder={`${formTopUp.values.nominal_topup}`}
            errorMessage={formTopUp.errors.nominal_topup}
            onChangeText={formTopUp.handleChange('nominal_topup')}
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
            buttonStyle={{
              backgroundColor: '#ed574e',
              width: '100%',
              height: '100%',
            }}
            titleStyle={{fontSize: 16, fontWeight: 'bold'}}
            raised={true}
            onPress={() => formTopUp.handleSubmit()}
            containerStyle={{marginBottom: 20, width: 200, height: 50}}
            title="Top Up"
          />
        </View>
        <View>
          <Input
            placeholder="FullName"
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
            placeholder="Email"
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
            placeholder="Address"
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
        </View>

        <Button title="Logout" onPress={() => dispatch(ActionLogout())} />
      </ScrollView>
    </View>
  );
}
