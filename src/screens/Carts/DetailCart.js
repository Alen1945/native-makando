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
      console.log(response.data);
    } catch (err) {
      alert(err.response.data.success, err.response.data.msg);
      console.log(err);
    }
  };
  return (
    <View style={{flex: 1}}>
      {!succesCheckout && (
        <View style={{paddingHorizontal: 10}}>
          <Text>Total Type Items {detailCart.totalTypeItems}</Text>
          <Text>Total Price Items {detailCart.totalPrice}</Text>
          <Button title="Checkout Items" onPress={handleCheckout} />
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
            }}
          />
          <Button title="Show Log Transaction" />
          <Button
            title="Show Items"
            onPress={() => {
              props.navigation.navigate('Items');
            }}
          />
        </View>
      )}
    </View>
  );
}
