import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Card, Avatar, Button, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import formatRupiah from '../../../helpers/formatRupiah';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserCart,
  removeItemCart,
  updateItemCart,
} from '../../../store/actions/actionUserCart';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_URL} from 'react-native-dotenv';
import alert from '../../../components/alert';

export default function CartItem(props) {
  const {item, keyItem} = props;
  const [idUpdate, setIdUpdate] = React.useState(0);
  const dispatch = useDispatch();
  const updateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      total_items: item.total_items,
    },
    validationSchema: Yup.object({
      total_items: Yup.number('Must Be a Number').required(
        'Required Total Item to Update',
      ),
    }),
    onSubmit: async (values, form) => {
      try {
        const response = await dispatch(
          updateItemCart(keyItem, idUpdate, values),
        );
        if (response.data && response.data.success) {
          dispatch(getUserCart());
          setIdUpdate(0);
        } else {
          alert(response.data.success, response.data.msg);
        }
      } catch (err) {
        alert(err.response.data.success, err.response.msg);
        console.log('something', err);
      }
    },
  });
  const handleUpdateItem = idCart => {
    if (idUpdate) {
      updateFormik.handleSubmit();
    } else {
      setIdUpdate(idCart);
    }
  };
  const showDeleteAlert = idCart => {
    Alert.alert('Remove Item', `Are You Sure to Remove ${item.name_item}?`, [
      {text: 'Cancel'},
      {
        text: 'Ok',
        onPress: () => {
          removeItem(idCart);
        },
      },
    ]);
  };
  const removeItem = async idCart => {
    try {
      const response = await dispatch(removeItemCart(keyItem, idCart));
      if (response.data && response.data.success) {
        console.log(response.data);
        // alert(response.data.success, response.data.msg);
      } else {
        alert(response.data.success, response.data.msg);
      }
    } catch (err) {
      alert(err.response.data.success, err.response.msg);
      console.log(err);
    }
  };
  return (
    <Card
      key={item.name_item + item._id}
      containerStyle={{
        marginHorizontal: 0,
        padding: 0,
        height: 150,
        borderRadius: 20,
        marginRight: 0,
        borderWidth: 0,
      }}>
      <View
        style={{
          height: '100%',
          flexDirection: 'row',
          padding: 10,
        }}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity style={{marginLeft: -40}}>
            <Avatar
              rounded
              title={item.name_item.substring(0, 2).toUpperCase()}
              size={100}
              containerStyle={{
                elevation: 2,
              }}
              source={{
                uri: `${API_URL}/${item.images}`,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              marginBottom: 10,
              color: '#666',
              fontWeight: 'bold',
            }}>
            {item.name_item}
          </Text>
          {idUpdate === 0 && idUpdate !== item._id ? (
            <>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 15,
                  marginLeft: 20,
                  color: '#444',
                  fontWeight: '800',
                }}>
                Total Items {item.total_items}
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 16,
                  marginLeft: 20,
                  color: '#444',
                  marginBottom: 5,
                }}>
                Total Price Rp. {formatRupiah(item.total_price)}
              </Text>
            </>
          ) : (
            <Input
              keyboardType="numeric"
              placeholder="Total Items"
              value={`${updateFormik.values.total_items}`}
              errorMessage={updateFormik.errors.total_items}
              onChangeText={updateFormik.handleChange('total_items')}
              inputStyle={{
                paddingHorizontal: 20,
                paddingVertical: 0,
                alignSelf: 'center',
              }}
              containerStyle={{flex: 2}}
              inputContainerStyle={{
                height: 40,
                alignContent: 'center',
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 50,
              }}
            />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => showDeleteAlert(item._id)}>
              <Button
                icon={<Icon name="trash" color="#fff" size={15} />}
                containerStyle={{marginHorizontal: 5}}
                buttonStyle={{
                  borderRadius: 20,
                  height: 35,
                  width: 35,
                  backgroundColor: '#f53649',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpdateItem(item._id)}>
              <Button
                icon={
                  <Icon
                    name={`${parseInt(idUpdate) === 0 ? 'pen' : 'check'}`}
                    color="#fff"
                    size={15}
                  />
                }
                containerStyle={{marginHorizontal: 5}}
                buttonStyle={{
                  borderRadius: 20,
                  height: 35,
                  width: 35,
                  backgroundColor: '#3db35c',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
}
