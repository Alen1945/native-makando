import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import getData from '../../helpers/getData';
import {Card, Avatar} from 'react-native-elements';
import {API_URL} from 'react-native-dotenv';
function Restaurants(props) {
  const {navigation} = props;
  const [restaurants, setRestaurants] = React.useState([]);
  const getRestaurants = async () => {
    try {
      const response = await getData('/browse-restaurants?sort[_id]=1');
      if (response.data && response.data.success) {
        setRestaurants(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getRestaurants();
  }, []);
  return (
    <>
      <View
        style={{
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
          Available Restaurants
        </Text>
      </View>
      <View
        style={{flex: 1, backgroundColor: '#fff', padding: 10, paddingTop: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurants}
          numColumns={2}
          contentContainerStyle={{flex: 1}}
          keyExtractor={item => item.name + item._id}
          renderItem={({item}) => (
            <Card
              containerStyle={{
                width: 160,
                marginHorizontal: 5,
                borderWidth: 0,
                elevation: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate('DetailScreens', {
                    screen: 'DetailRestaurant',
                    params: {
                      id: item._id,
                    },
                  })
                }>
                <>
                  <Avatar
                    elevation={3}
                    rounded
                    size={120}
                    source={{uri: `${API_URL}/${item.logo}`}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      fontSize: 16,
                      color: '#434343',
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                </>
              </TouchableHighlight>
            </Card>
          )}
        />
      </View>
    </>
  );
}

export default Restaurants;
