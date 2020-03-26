import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {SearchBar, Button, Avatar} from 'react-native-elements';
import getData from '../../helpers/getData';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_URL} from 'react-native-dotenv';
import formatRupiah from '../../helpers/formatRupiah';
function Items(props) {
  const {navigation} = props;
  const [lastOrder, setLastOrder] = React.useState('');
  const [items, setItems] = React.useState([]);
  const getItems = async () => {
    try {
      const response = await getData('/browse-items?limit=16&sort[_id]=1');
      if (response.data && response.data.success) {
        setItems(response.data.dataItems);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getLastOrder = async () => {
    try {
      const response = await getData('/history');
      if (response.data) {
        setLastOrder(response.data.data[0].listItem[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getLastOrder();
    getItems();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          padding: 10,
          height: 220,
          backgroundColor: '#f54251',
        }}>
        <Text
          style={{
            color: '#fff',
            paddingLeft: 15,
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {Object.keys(lastOrder).length ? 'Latest Order' : 'See Offers'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {Object.keys(lastOrder).length ? (
              <>
                <Avatar
                  rounded
                  title={lastOrder.name.substring(0, 2).toUpperCase()}
                  size={40}
                  containerStyle={{
                    marginBottom: 5,
                  }}
                  source={{
                    uri: `${API_URL}/${lastOrder.images}`,
                  }}
                />
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {lastOrder.name}
                </Text>
              </>
            ) : (
              <Text style={{color: 'white', textAlign: 'center'}}>
                What You want Today
              </Text>
            )}
            <Button
              color="white"
              titleStyle={{
                fontSize: 14,
                color: '#f54251',
              }}
              buttonStyle={{
                backgroundColor: 'white',
                paddingVertical: 2,
              }}
              containerStyle={{
                marginTop: 5,
              }}
              onPress={() => {
                if (Object.keys(lastOrder).length) {
                  navigation.navigate('DetailScreens', {
                    screen: 'DetailItem',
                    params: {
                      id: lastOrder.id,
                    },
                  });
                } else {
                  navigation.navigate('Items');
                }
              }}
              title={
                Object.keys(lastOrder).length ? 'Order Again' : 'Show Items'
              }
            />
          </View>
          <View
            style={{
              flex: 6,
              marginHorizontal: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={require('../../../icons/homeBack.png')} />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          paddingTop: 18,
          paddingHorizontal: 10,
          marginTop: -40,
          backgroundColor: '#fff',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#555',
            }}>
            Avaible Items
          </Text>
          <View style={{paddingBottom: 20, paddingHorizontal: 5}}>
            {items &&
              items.map(item => (
                <View key={item._id} style={{marginBottom: 40}}>
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate('DetailScreens', {
                        screen: 'DetailItem',
                        params: {
                          id: item._id,
                        },
                      })
                    }>
                    <>
                      <ImageBackground
                        style={{height: 200, width: '100%', marginBottom: 10}}
                        source={{uri: `${API_URL}/${item.images}`}}
                      />
                      <Text
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontSize: 16,
                          color: '#555',
                        }}>
                        {item.name}
                      </Text>
                    </>
                  </TouchableHighlight>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon size={15} name="money-bill-alt" color="#f7606e" />
                    <Text style={{fontSize: 18, color: '#777'}}>
                      &nbsp;Rp. {formatRupiah(item.price)} &nbsp;
                    </Text>
                    <Icon size={15} name="store" color="#f7606e" />
                    <Text style={{fontSize: 17, color: '#777'}}>
                      {' '}
                      &nbsp;{item.name_restaurant}
                    </Text>
                  </View>
                </View>
              ))}
            <Button
              title="More Items..."
              onPress={() => {
                navigation.navigate('Items');
              }}
              containerStyle={{
                width: 200,
                alignSelf: 'center',
              }}
              buttonStyle={{
                padding: 5,
                backgroundColor: '#f54251',
              }}
              titleStyle={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Items;
