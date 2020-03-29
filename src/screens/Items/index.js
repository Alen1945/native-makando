import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SearchBar, Button, Card, Avatar} from 'react-native-elements';
import getData from '../../helpers/getData';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_URL} from 'react-native-dotenv';
import formatRupiah from '../../helpers/formatRupiah';
function Items(props) {
  const {navigation} = props;
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activePage, setActivePage] = React.useState(1);
  const [categories, setCategories] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [search, setSearch] = React.useState('');
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
      const condition = `limit=20&sort[created_at]=1&page=${page}`;
      let url = `/browse-items?${condition}`;
      if (category) {
        url = `/browse-categories/${category}?${condition}`;
      }
      if (search && search.trim() && search.length > 3) {
        url += `&search[name]=${search}`;
      }
      const response = await getData(url);
      if (response.data && response.data.success) {
        setItems(response.data);
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
  }, []);
  React.useEffect(() => {
    getItems(activePage, activeCategory);
  }, [activePage, activeCategory]);
  React.useEffect(() => {
    if (search && search.trim() && search.length > 3) {
      getItems(activePage, activeCategory);
    } else if (search.length === 0) {
      getItems(activePage, activeCategory);
    }
  }, [search, activePage]);
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
          Avaible Items
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
        <View style={{paddingHorizontal: 10}}>
          <View style={{paddingHorizontal: 10, marginBottom: 10}}>
            <SearchBar
              placeholder="Search Here..."
              round={false}
              value={search}
              onChangeText={value => setSearch(value)}
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
        <View style={{marginBottom: 100}}>
          <FlatList
            data={items.dataItems}
            keyExtractor={item => item.name + item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={{alignItems: 'center', paddingBottom: 60}}
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
                    navigation.navigate('DetailScreens', {
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
        </View>
        {/* {true && (
          <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 10,
              marginBottom: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{marginBottom: 20, color: '#444', fontSize: 20}}>
              ini Page
            </Text>
          </View>
        )} */}
        {(!items.dataItems || !items.dataItems.length) && (
          <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 10,
              marginTop: -90,
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
    </>
  );
}

export default Items;
