import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {clearUserCart} from '../../store/actions/actionUserCart';
import getData from '../../helpers/getData';
import alert from '../../components/alert';
export default function DetailCart(props) {
  const [succesCheckout, setSuccesCheckout] = React.useState(false);
  const detailCart = useSelector(state => state.dataCart);
  const dispatch = useDispatch();
  const handleCheckout = async () => {
    try {
      const response = await getData('/checkout');
      if (response.data && response.data.success) {
        await dispatch(clearUserCart());
        setSuccesCheckout(true);
      } else {
        alert(response.data.success, response.data.msg);
      }
    } catch (err) {
      alert(err.response.data.success, err.response.data.msg);
      console.log(err);
    }
  };
  return (
    <View style={{flex: 1}}>
      {!succesCheckout && (
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'red',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            One More Step
          </Text>
          <Image
            source={require('../../../icons/getCheckout.png')}
            style={{width: 200, marginBottom: 10}}
          />
          <Text
            style={{
              fontSize: 18,
              color: 'red',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Detail
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 5,
              color: '#777',
            }}>
            Total Type Items : {detailCart.totalTypeItems}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginVertical: 10,
              color: '#555',
            }}>
            Total Price Items : {detailCart.totalPrice}
          </Text>
          <Button
            title="Checkout Items"
            style={{fontSize: 20}}
            onPress={handleCheckout}
          />
        </View>
      )}
      {succesCheckout && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              paddingBottom: 20,
              fontWeight: 'bold',
              color: '#f53649',
            }}>
            Checkout Success
          </Text>
          <Image
            source={require('../../../icons/successcheckout.png')}
            width="auto"
            height="auto"
            style={{
              height: 180,
              marginBottom: 20,
            }}
          />
          <Button
            title="Back"
            onPress={() => {
              props.navigation.navigate('Items');
            }}
          />
        </View>
      )}
    </View>
  );
}
