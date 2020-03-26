import React from 'react';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {Card, Badge, Avatar} from 'react-native-elements';
import getData from '../../helpers/getData';
import {API_URL} from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import formatRupiah from '../../helpers/formatRupiah';
function DetailItem(props) {
  const [detailItem, setDetailItem] = React.useState([]);
  const getDetailItem = async () => {
    try {
      const response = await getData('/browse-items/' + props.route.params.id);
      if (response.data && response.data.success) {
        setDetailItem(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getDetailItem();
  }, [props.route.params]);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{height: 220, position: 'relative'}}>
        <ImageBackground
          style={{height: 200, width: '100%', marginBottom: 10}}
          source={{uri: `${API_URL}/${detailItem.images}`}}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: 50,
            right: 20,
            color: '#fff',
            backgroundColor: '#f54251',
            padding: 5,
            textAlign: 'center',
            minWidth: 120,
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Rp. {formatRupiah(detailItem.price)}
        </Text>
      </View>
      <Card
        containerStyle={{
          flex: 1,
          marginHorizontal: 0,
          padding: 20,
          paddingHorizontal: 10,
          borderRadius: 30,
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
              {detailItem.name}
            </Text>
            <View style={{paddingLeft: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="location-arrow"
                  size={13}
                  style={{marginRight: 10, color: '#d15a64'}}
                />
                <Text style={{fontSize: 16, color: '#666'}}>
                  {detailItem.name_category}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="store-alt"
                  size={13}
                  style={{marginRight: 10, color: '#d15a64'}}
                />
                <Text style={{fontSize: 16, color: '#666'}}>
                  {detailItem.name_restoran}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: 50,
              marginHorizontal: 5,
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <>
                <Badge
                  containerStyle={{bottom: -2, right: -20}}
                  badgeStyle={{
                    height: 22,
                    width: 22,
                    borderRadius: 25,
                  }}
                  textStyle={{
                    fontSize: 15,
                  }}
                  status="error"
                  value={3}
                />
                <Icon name="cart-plus" color="#f54251" size={30} />
              </>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 18, color: '#666'}}>Related Item</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{flexDirection: 'row'}}>
            {detailItem.relatedItem &&
              detailItem.relatedItem.map(related => (
                <Card
                  key={related.name + related._id}
                  component={View}
                  containerStyle={{
                    marginRight: 0,
                    borderWidth: 0,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('DetailScreens', {
                        screen: 'DetailItem',
                        params: {
                          id: related._id,
                        },
                      })
                    }>
                    <Avatar
                      rounded
                      title={related.name.substring(0, 2).toUpperCase()}
                      size={120}
                      containerStyle={{
                        marginBottom: 5,
                      }}
                      source={{
                        uri: `${API_URL}/${related.images}`,
                      }}
                    />
                    <Text
                      style={{textAlign: 'left', color: '#777', fontSize: 15}}>
                      {related.name}
                    </Text>
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
                      {related.name_category}
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
                      {related.name_restaurant}
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
                    Rp. {formatRupiah(related.price)}
                  </Text>
                </Card>
              ))}
          </ScrollView>
        </View>
      </Card>
    </View>
  );
}

export default DetailItem;
