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
  const [activeCategory, setActiveCategory] = React.useState(0);
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
  const getItems = async (page, category) => {
    try {
      const condition = `limit=5&sort[created_at]=1&page=${page}`;
      let url = `/browse-items?${condition}`;
      if (category) {
        url = `/browse-categories/${category}?${condition}`;
      }
      // if (search && search.trim()) {
      //   console.log(search);
      //   url += `&search[name]=${search}`;
      // }
      const response = await getData(url);
      if (response.data && response.data.success) {
        setItems(response.data.dataItems);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeCategory = categoryId => {
    setActiveCategory(categoryId);
  };
  React.useEffect(() => {
    getCategories();
    getItems(1, activeCategory);
  }, [activeCategory]);
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
            <View style={{width: 80, marginHorizontal: 3}}>
              <Button
                title="Show All"
                onPress={() => handleChangeCategory(0)}
                type={parseInt(activeCategory) === 0 ? 'solid' : 'outline'}
                containerStyle={{width: '100%'}}
                buttonStyle={{
                  borderColor: `${
                    parseInt(activeCategory) === 0 ? '#fff' : '#f54251'
                  }`,
                  backgroundColor: `${
                    parseInt(activeCategory) === 0 ? '#f54251' : '#fff'
                  }`,
                }}
                titleStyle={{
                  fontSize: 12,
                  color: `${
                    parseInt(activeCategory) == 0 ? '#fff' : '#f54251'
                  }`,
                }}
              />
            </View>
            {categories &&
              categories.map(category => (
                <View
                  style={{width: 80, marginHorizontal: 3}}
                  key={category._id}>
                  <Button
                    onPress={() => handleChangeCategory(category._id)}
                    title={category.name}
                    type={
                      parseInt(activeCategory) === category._id
                        ? 'solid'
                        : 'outline'
                    }
                    containerStyle={{width: '100%'}}
                    buttonStyle={{
                      borderColor: `${
                        parseInt(activeCategory) === category._id
                          ? '#fff'
                          : '#f54251'
                      }`,
                      backgroundColor: `${
                        parseInt(activeCategory) === category._id
                          ? '#f54251'
                          : '#fff'
                      }`,
                    }}
                    titleStyle={{
                      fontSize: 12,
                      color: `${
                        parseInt(activeCategory) == category._id
                          ? '#fff'
                          : '#f54251'
                      }`,
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
