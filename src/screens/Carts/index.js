import React from 'react';
import {Text, View, Image, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUserCart} from '../../store/actions/actionUserCart';
import CartItem from './components/CartItem';
import {ScrollView} from 'react-native-gesture-handler';
export default function Carts(props) {
  const dispatch = useDispatch();
  const dataCart = useSelector(state => state.dataCart);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginBottom: 10,
          elevation: 4,
          backgroundColor: '#FFF',
          height: 50,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#555',
          }}>
          My Carts
        </Text>
      </View>
      <ScrollView>
        <View
          style={{paddingHorizontal: 10, paddingBottom: 40, paddingLeft: 40}}>
          {dataCart &&
            Object.keys(dataCart.itemInCart)
              .sort()
              .map(keyItem => {
                let item = dataCart.itemInCart[keyItem];
                return (
                  <CartItem item={item} keyItem={keyItem} key={item._id} />
                );
              })}
          {Object.keys(dataCart.itemInCart).length > 0 && (
            <View style={{marginTop: 20}}>
              <Button
                title="Total Cost"
                color="#f53649"
                onPress={() =>
                  props.navigation.navigate('DetailScreens', {
                    screen: 'DetailCart',
                  })
                }
              />
            </View>
          )}
          {Object.keys(dataCart.itemInCart).length < 1 && (
            <View
              style={{
                paddingTop: 100,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {console.log(dataCart.itemInCart)}
              <Text
                style={{
                  fontSize: 30,
                  paddingBottom: 20,
                  fontWeight: 'bold',
                  color: '#f53649',
                }}>
                Your Carts Is Empty
              </Text>
              <Image
                source={require('../../../icons/emptyCart.png')}
                width="auto"
                height="auto"
                style={{
                  height: 180,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
