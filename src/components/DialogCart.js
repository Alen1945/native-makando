import React from 'react';
import {View, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {updateItemCart, removeItemCart} from '../store/actions/actionUserCart';
import {useNavigation} from '@react-navigation/native';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
import alert from './alert';
export default function DialogCart(props) {
  const {visible, keyUpdateItem} = props;
  const navigation = useNavigation();
  const {itemInCart} = useSelector(state => state.dataCart);
  const dispatch = useDispatch();
  const [hide, setHide] = React.useState(false);
  const showDeleteAlert = (deleteItem, idCart) => {
    const keyItem = `${deleteItem.name_item}_${deleteItem.id_item}`;
    Alert.alert(
      'Remove Item',
      `Are You Sure to Remove ${deleteItem.name_item}?`,
      [
        {text: 'Cancel'},
        {
          text: 'Ok',
          onPress: () => {
            removeItem(keyItem, idCart);
          },
        },
      ],
    );
  };
  const removeItem = async (keyItem, idCart) => {
    try {
      const response = await dispatch(removeItemCart(keyItem, idCart));
      if (response.data && response.data.success) {
        console.log(response.data);
      } else {
        alert(response.data.success, response.data.msg);
      }
      console.log(response.data);
    } catch (err) {
      alert(err.response.data.success, err.response.data.msg);
      console.log(err);
    }
  };
  return (
    <>
      {visible && itemInCart[keyUpdateItem] && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            right: 0,
            left: 0,
            bottom: !hide ? 0 : -310,
            height: 320,
            padding: 10,
            paddingTop: 30,
            elevation: 4,
          }}>
          <View style={{position: 'absolute', top: -20, left: '47%'}}>
            <TouchableOpacity
              onPress={() => setHide(hideState => !hideState)}
              style={{
                backgroundColor: '#fff',
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 4,
              }}>
              <Icon
                name={`${hide ? 'angle-up' : 'angle-down'}`}
                color="#ed574e"
                size={23}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: 100, marginBottom: 30}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  showDeleteAlert(
                    {
                      name_item: itemInCart[keyUpdateItem].name_item,
                      id_item: itemInCart[keyUpdateItem].id_item,
                    },
                    itemInCart[keyUpdateItem]._id,
                  )
                }
                style={{
                  marginRight: 6,
                  backgroundColor: '#ed574e',
                  padding: 3,
                  paddingHorizontal: 5,
                  borderRadius: 4,
                }}>
                <Icon name="trash" size={14} color="#eee" />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#444',
                  fontSize: 19,
                  marginRight: 5,
                }}>
                {itemInCart[keyUpdateItem].name_item}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#ed574e',
                  fontSize: 17,
                  backgroundColor: '#fefefe',
                  padding: 2,
                  paddingHorizontal: 4,
                  borderRadius: 4,
                }}>
                {itemInCart[keyUpdateItem].total_items}
              </Text>
            </View>
            <Text style={{color: '#444', fontSize: 16, marginBottom: 5}}>
              Update Total Items
            </Text>
            <View style={{marginTop: 5}}>
              <Formik
                enableReinitialize
                initialValues={{
                  total_items: keyUpdateItem
                    ? itemInCart[keyUpdateItem].total_items
                    : 0,
                }}
                validationSchema={Yup.object({
                  total_items: Yup.number('Must Be a Number').required(
                    'Required Total Item to Update',
                  ),
                })}
                onSubmit={async values => {
                  try {
                    const response = await dispatch(
                      updateItemCart(
                        `${itemInCart[keyUpdateItem].name_item}_${
                          itemInCart[keyUpdateItem].id_item
                        }`,
                        itemInCart[keyUpdateItem]._id,
                        values,
                      ),
                    );
                    if (response.data && response.data.success) {
                      console.log(response.data.data);
                    } else {
                      alert(response.data.success, response.data.msg);
                    }
                  } catch (err) {
                    alert(er.response.data.success, err.response.data.msg);
                    console.log(err);
                  }
                }}>
                {formikProps => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input
                      keyboardType="numeric"
                      placeholder="Total Items"
                      value={`${formikProps.values.total_items}`}
                      errorMessage={formikProps.errors.total_items}
                      onChangeText={formikProps.handleChange('total_items')}
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
                    <Button
                      type="solid"
                      buttonStyle={{
                        backgroundColor: '#ed574e',
                      }}
                      titleStyle={{fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => formikProps.handleSubmit()}
                      containerStyle={{flex: 1}}
                      title="Update"
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
          {Object.keys(itemInCart).length > 1 && (
            <View style={{flex: 1}}>
              <Text style={{color: '#444', fontSize: 16, marginBottom: 6}}>
                Another Item In Cart
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {itemInCart &&
                    Object.keys(itemInCart)
                      .reverse()
                      .filter(keyItem => keyItem !== keyUpdateItem)
                      .map(keyItem => (
                        <View
                          key={itemInCart[keyItem].id_item}
                          style={{
                            backgroundColor: '#eee',
                            borderRadius: 4,
                            height: 30,
                            paddingHorizontal: 5,
                            margin: 5,
                            minWidth: 150,
                            marginHorizontal: 5,
                            justifyContent: 'center',
                            position: 'relative',
                          }}>
                          <View
                            style={{
                              position: 'absolute',
                              top: -5,
                              left: -10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                showDeleteAlert(
                                  {
                                    name_item: itemInCart[keyItem].name_item,
                                    id_item: itemInCart[keyItem].id_item,
                                  },
                                  itemInCart[keyItem]._id,
                                )
                              }>
                              <Icon
                                name="times-circle"
                                size={20}
                                style={{color: '#ed574e'}}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('DetailScreens', {
                                  screen: 'DetailItem',
                                  params: {
                                    id: itemInCart[keyItem].id_item,
                                  },
                                })
                              }>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: '#555',
                                }}>
                                {itemInCart[keyItem].name_item}
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                textAlign: 'center',
                                backgroundColor: '#fff',
                                color: '#f54251',
                                padding: 2,
                                paddingHorizontal: 4,
                                minWidth: 20,
                                borderRadius: 5,
                                fontWeight: 'bold',
                              }}>
                              {itemInCart[keyItem].total_items}
                            </Text>
                          </View>
                        </View>
                      ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </>
  );
}
