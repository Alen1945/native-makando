import React from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {updateItemCart} from '../store/actions/actionUserCart';
import {useNavigation} from '@react-navigation/native';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
export default function DialogCart(props) {
  const {visible, keyUpdateItem} = props;
  const navigation = useNavigation();
  const {itemInCart} = useSelector(state => state.dataCart);
  const dispatch = useDispatch();
  const [hide, setHide] = React.useState(false);
  return (
    <>
      {visible && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            right: 0,
            left: 0,
            bottom: !hide ? 0 : -290,
            height: 300,
            padding: 10,
            paddingTop: 20,
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
                color="#555"
                size={23}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: 100, marginBottom: 20}}>
            <Text style={{color: '#555', fontSize: 16, marginBottom: 5}}>
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
                  console.log(values);
                  try {
                    await dispatch(
                      updateItemCart(
                        `${itemInCart[keyUpdateItem].name_item}_${
                          itemInCart[keyUpdateItem].id_item
                        }`,
                        itemInCart[keyUpdateItem]._id,
                        values,
                      ),
                    );
                  } catch (err) {
                    console.log(err);
                  }
                }}>
                {formikProps => (
                  <View style={{flexDirection: 'row'}}>
                    <Input
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
          <View style={{flex: 1}}>
            <Text style={{color: '#555', fontSize: 16, marginBottom: 6}}>
              Item In Cart
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
                          style={{position: 'absolute', top: -5, left: -10}}>
                          <TouchableOpacity>
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
                                color: `${
                                  itemInCart[keyUpdateItem]._id ===
                                  itemInCart[keyItem]._id
                                    ? '#4cb3d4'
                                    : '#555'
                                }`,
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
        </View>
      )}
    </>
  );
}
