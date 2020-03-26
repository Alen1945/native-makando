import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {SearchBar, Button} from 'react-native-elements';
import getData from '../../helpers/getData';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_URL} from 'react-native-dotenv';
import formatRupiah from '../../helpers/formatRupiah';
function Items(props) {
  const {navigation} = props;
  const [categories, setCategories] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const getCategories = async () => {
    try {
      const response = await getData('/browse-categories?limit=10&sort[_id]=1');
      if (response.data && response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getItems = async () => {
    try {
      const response = await getData('/browse-items?limit=10&sort[_id]=1');
      if (response.data && response.data.success) {
        setItems(response.data.dataItems);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getCategories();
    getItems();
  }, []);
  return (
    <View
      style={{flex: 1, backgroundColor: '#fff', padding: 10, paddingTop: 20}}>
      <View style={{paddingHorizontal: 10}}>
        <View style={{paddingHorizontal: 10, marginBottom: 10}}>
          <SearchBar
            placeholder="Search Here..."
            round={false}
            searchIcon={<Icon name="search" size={15} color="#999" />}
            containerStyle={{
              backgroundColor: 'rgba(0,0,0,0)',
              padding: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#999',
              borderTopWidth: 0,
              marginBottom: 10,
            }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255,255,255,.5)',
              borderRadius: 25,
              paddingHorizontal: 10,
            }}
            inputStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              height: 60,
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingVertical: 10,
            }}>
            {categories &&
              categories.map(category => (
                <View
                  style={{width: 80, marginHorizontal: 3}}
                  key={category._id}>
                  <Button
                    title={category.name}
                    type="outline"
                    containerStyle={{width: '100%'}}
                    buttonStyle={{
                      borderColor: '#f54251',
                    }}
                    titleStyle={{
                      fontSize: 12,
                      color: '#f54251',
                    }}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
      <View style={{paddingBottom: 150, paddingHorizontal: 5}}>
        <FlatList
          data={items}
          keyExtractor={item => item.name + item._id}
          showsVerticalScrollIndicator={false}
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
                    source={{uri: `${API_URL}/${item.images}`}}
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

export default Items;
