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
    <View
      style={{flex: 1, backgroundColor: '#fff', padding: 10, paddingTop: 20}}>
      <View style={{paddingBottom: 20, paddingHorizontal: 5}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurants}
          keyExtractor={item => item.name + item._id}
          renderItem={({item}) => (
            <View style={{marginBottom: 40}}>
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
                    source={{uri: `${API_URL}/${item.logo}`}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      fontSize: 18,
                    }}>
                    {item.name}
                  </Text>
                </>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default Restaurants;
