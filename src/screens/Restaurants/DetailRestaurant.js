import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Card, Badge, Avatar} from 'react-native-elements';
import getData from '../../helpers/getData';
import {API_URL} from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import formatRupiah from '../../helpers/formatRupiah';
function DetailRestaurant(props) {
  const [detailRestaurant, setDetailRestaurant] = React.useState({});
  const [dataItems, setDataItems] = React.useState([]);
  const getDetailRestaurants = async () => {
    try {
      const response = await getData(
        '/browse-restaurants/' + props.route.params.id,
      );
      if (response.data && response.data.success) {
        setDetailRestaurant(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getItems = async (page, category) => {
    try {
      const condition = `limit=20&sort[created_at]=1&page=${page}`;
      let url = `/browse-restaurants/${
        props.route.params.id
      }/items?${condition}`;
      const response = await getData(url);
      setDataItems(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getItems();
    getDetailRestaurants();
  }, [props]);
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 200, position: 'relative'}}>
          <ImageBackground
            style={{height: '100%', width: 'auto', marginBottom: 10}}
            source={{uri: `${API_URL}/${detailRestaurant.logo}`}}
          />
        </View>
        <Card
          containerStyle={{
            flex: 1,
            marginHorizontal: 0,
            padding: 10,
            paddingHorizontal: 10,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            marginTop: -40,
            backgroundColor: '#fff',
            shadowColor: '#333',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#eaeaea',
              borderRadius: 10,
              padding: 5,
            }}>
            <View style={{flex: 1, marginHorizontal: 5}}>
              <Text
                style={{
                  fontWeight: '900',
                  textAlign: 'left',
                  textTransform: 'capitalize',
                  fontSize: 22,
                  marginBottom: 10,
                  color: '#f54251',
                }}>
                {detailRestaurant.name}
              </Text>
              <View style={{paddingLeft: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="map-marker"
                    size={13}
                    style={{marginRight: 10, color: '#d15a64'}}
                  />
                  <Text style={{fontSize: 16, color: '#666'}}>
                    {detailRestaurant.address || 'Not Set'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="paperclip"
                    size={13}
                    style={{marginRight: 10, color: '#d15a64'}}
                  />
                  <Text style={{fontSize: 16, color: '#666'}}>
                    {detailRestaurant.description || 'No Description'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 100}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#666',
              }}>
              Items In Restaurants
            </Text>
            <FlatList
              data={dataItems.dataItems}
              keyExtractor={item => item.name + item._id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 200,
              }}
              renderItem={({item}) => (
                <Card
                  containerStyle={{
                    width: 160,
                    borderWidth: 0,
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('DetailScreens', {
                        screen: 'DetailItem',
                        params: {
                          id: item._id,
                        },
                      })
                    }>
                    <>
                      <Avatar
                        rounded
                        title={item.name.substring(0, 2).toUpperCase()}
                        size={110}
                        containerStyle={{
                          marginBottom: 5,
                        }}
                        source={{uri: `${API_URL}/${item.images}`}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontSize: 14,
                        }}>
                        {item.name}
                      </Text>
                    </>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="location-arrow"
                      size={10}
                      style={{marginRight: 10, color: '#d15a64'}}
                    />
                    <Text style={{fontSize: 12, color: '#666'}}>
                      {item.name_category}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="store-alt"
                      size={10}
                      style={{marginRight: 10, color: '#d15a64'}}
                    />
                    <Text style={{fontSize: 10, color: '#666'}}>
                      {item.name_restaurant}
                    </Text>
                  </View>
                  <Text
                    style={{
                      backgroundColor: '#f54251',
                      padding: 3,
                      marginVertical: 5,
                      borderRadius: 10,
                      textAlign: 'center',
                      fontSize: 15,
                      color: '#FFF',
                      fontWeight: 'bold',
                    }}>
                    Rp. {formatRupiah(item.price)}
                  </Text>
                </Card>
              )}
            />
            {(!dataItems.dataItems || !dataItems.dataItems.length) && (
              <View
                style={{
                  paddingTop: 20,
                  paddingHorizontal: 10,
                  marginTop: -80,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{marginBottom: 20, color: '#444', fontSize: 20}}>
                  Data Empty
                </Text>
                <Image source={require('../../../icons/emptyItems.png')} />
              </View>
            )}
          </View>
        </Card>
      </View>
    </>
  );
}

export default DetailRestaurant;
