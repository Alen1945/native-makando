import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Picker,
  TouchableOpacity,
} from 'react-native';
import {Avatar, TextInput, Input, Button, Icon} from 'react-native-elements';
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
import pacthData from '../../helpers/patchData';
import formatRupiah from '../../helpers/formatRupiah';
import ImagePicker from 'react-native-image-picker';
export default function Profile(props) {
  const {dataProfile} = useSelector(state => state.dataUser);
  const [uriImageUpload, setUriImageUpload] = React.useState('');
  const dispatch = useDispatch();
  const [statusEdit, setStatusEdit] = React.useState(false);
  const formTopUp = useFormik({
    enableReinitialize: true,
    initialValues: {nominal_topup: 0},
    validationSchema: Yup.object({nominal_topup: Yup.number().required()}),
    onSubmit: async (values, form) => {
      try {
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

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: dataProfile,
    validationSchema: Yup.object({
      fullname: Yup.string().nullable(),
      email: Yup.string()
        .email()
        .nullable(),
      gender: Yup.string()
        .oneOf(['male', 'female'], 'Select male Or Female')
        .nullable(),
      address: Yup.string().nullable(),
      picture: Yup.mixed().nullable(),
    }),
    onSubmit: async (values, form) => {
      setStatusEdit(true);
      try {
        const formData = new FormData();
        Object.keys(values)
          .filter(v => dataProfile[v] !== values[v])
          .forEach(v => {
            if (v === 'picture') {
              formData.append(v, {
                name: values[v].fileName,
                type: values[v].type,
                uri: values[v].uri,
              });
            } else {
              formData.append(v, values[v]);
            }
          });
        const response = await pacthData('/profile', formData);
        if (response.data && response.data.success) {
          await dispatch(setUserProfile());
          alert(response.data.success, response.data.msg);
        } else {
          alert(response.data.success, response.data.msg);
        }
      } catch (e) {
        console.log(e);
        alert(e.response.data.success, e.response.data.msg);
      }
      setStatusEdit(false);
    },
  });
  const handleChangePicture = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setUriImageUpload(response.uri);
        formUpdate.setFieldValue('picture', response);
        console.log(response);
      }
    });
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: 100,
          backgroundColor: '#ed574e',
        }}>
        <View
          style={{
            height: 120,
            alignItems: 'center',
            backgroundColor: '#fff',
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            overflow: 'visible',
            paddingBottom: 10,
            position: 'relative',
          }}>
          <Avatar
            rounded
            title={dataProfile.username.substring(0, 1)}
            size={120}
            elevator={1}
            containerStyle={{marginTop: -60, marginBottom: 10}}
            source={{
              uri:
                statusEdit && uriImageUpload
                  ? uriImageUpload
                  : `${API_URL}/${dataProfile.picture}`,
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#444', fontWeight: 'bold'}}>
              {dataProfile.username}
            </Text>
            <Text style={{fontSize: 12, color: '#444', fontWeight: 'bold'}}>
              {dataProfile.fullname}
            </Text>
          </View>
          {statusEdit && (
            <TouchableOpacity
              style={{position: 'absolute', top: -20}}
              onPress={() => {
                handleChangePicture();
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  reverse
                  name="image"
                  type="font-awesome"
                  color="#ed574e"
                  size={15}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 10,
                marginBottom: 20,
              }}>
              <View style={{flex: 6, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    backgroundColor: '#ed574e',
                    borderRadius: 10,
                    padding: 10,
                    paddingHorizontal: 15,
                  }}>
                  Saldo: Rp. {formatRupiah(dataProfile.balance)}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#666',
                    textTransform: 'capitalize',
                  }}>
                  {dataProfile.address || 'No Address'}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#666',
                    textTransform: 'capitalize',
                  }}>
                  {dataProfile.gender || 'No Set'}
                </Text>
              </View>
              <View
                style={{
                  flex: 5,
                  alignContent: 'center',
                }}>
                <Input
                  keyboardType="numeric"
                  value={`${formTopUp.values.nominal_topup}`}
                  errorMessage={formTopUp.errors.nominal_topup}
                  onChangeText={formTopUp.handleChange('nominal_topup')}
                  inputStyle={{paddingHorizontal: 18}}
                  containerStyle={{
                    marginBottom: 5,
                    alignSelf: 'center',
                  }}
                  inputContainerStyle={{
                    height: 35,
                    borderWidth: 1,
                    borderColor: '#444',
                    borderRadius: 5,
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
                  onPress={() => {
                    formTopUp.handleSubmit();
                  }}
                  containerStyle={{
                    width: 100,
                    alignSelf: 'center',
                    height: 35,
                  }}
                  title="Top Up"
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => setStatusEdit(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  reverse
                  name="edit"
                  type="material-icon"
                  color="#ed574e"
                  size={15}
                />
                <Text style={{fontSize: 18, color: '#555'}}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Carts')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  reverse
                  name="shopping-cart"
                  type="font-awesome"
                  color="#ed574e"
                  size={15}
                />
                <Text style={{fontSize: 18, color: '#555'}}>Carts</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  reverse
                  name="tasks"
                  type="font-awesome"
                  color="#ed574e"
                  size={15}
                />
                <Text style={{fontSize: 18, color: '#555'}}>
                  Log Transaction
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  reverse
                  name="clipboard"
                  type="font-awesome"
                  color="#ed574e"
                  size={15}
                />
                <Text style={{fontSize: 18, color: '#555'}}>Added Review</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(ActionLogout())}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  reverse
                  name="sign-out"
                  type="font-awesome"
                  color="#ed574e"
                  size={15}
                />
                <Text style={{fontSize: 18, color: '#555'}}>Logout</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {statusEdit && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 350,
            paddingTop: 30,
            paddingBottom: 30,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            elevation: 4,
          }}>
          <TouchableOpacity
            onPress={() => setStatusEdit(false)}
            style={{
              position: 'absolute',
              top: -20,
              left: '50%',
            }}>
            <Icon name="close" type="font-awesome" size={40} color="red" />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              placeholder="FullName"
              inputStyle={{paddingHorizontal: 18}}
              value={`${formUpdate.values.fullname}`}
              errorMessage={formUpdate.errors.fullname}
              onChangeText={formUpdate.handleChange('fullname')}
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
              value={`${formUpdate.values.email}`}
              errorMessage={formUpdate.errors.email}
              onChangeText={formUpdate.handleChange('email')}
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
            <View
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 50,
                paddingHorizontal: 20,
                marginHorizontal: 10,
                marginBottom: 25,
              }}>
              <Picker
                selectedValue={`${formUpdate.values.gender}`}
                errorMessage={formUpdate.errors.gender}
                onValueChange={formUpdate.handleChange('gender')}>
                {[
                  {value: 'male', label: 'Male'},
                  {value: 'female', label: 'Female'},
                ].map(v => (
                  <Picker.Item label={v.label} key={v.value} value={v.value} />
                ))}
              </Picker>
            </View>
            <Input
              placeholder="Address"
              value={`${formUpdate.values.address}`}
              errorMessage={formUpdate.errors.fullname}
              onChangeText={formUpdate.handleChange('address')}
              inputStyle={{
                paddingHorizontal: 18,
                paddingVertical: 0,
                margin: 0,
              }}
              containerStyle={{
                marginBottom: 25,
              }}
              multiline={true}
              numberOfLines={4}
              inputContainerStyle={{
                height: 100,
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 20,
              }}
            />
            <Button
              title="Update"
              style={{marginBottom: 20}}
              onPress={() => {
                formUpdate.handleSubmit();
              }}
            />
          </ScrollView>
        </View>
      )}
    </>
  );
}
