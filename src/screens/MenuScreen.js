import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Main');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  const loadMenuItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('menuItems');
      if (savedItems) {
        setMenuItems(JSON.parse(savedItems));
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error loading menu items from AsyncStorage', error);
      Alert.alert('Error', 'Failed to load menu items.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleAddToCart = async (newItem) => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      const existingItems = storedItems ? JSON.parse(storedItems) : [];
      const updatedCart = [...existingItems, newItem];
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      navigation.navigate('CartScreen', { items: updatedCart });
    } catch (error) {
      console.log('Error adding item to cart: ', error);
    }
  };

  const filteredItems = menuItems.filter(item =>
    item.course === selectedCategory &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#8B4513" />;
  }

  const totalCategoryCourses = filteredItems.length;
  const startersCount = menuItems.filter(item => item.course === 'Starters').length;
  const mainsCount = menuItems.filter(item => item.course === 'Main').length;
  const dessertsCount = menuItems.filter(item => item.course === 'Desserts').length;
  const totalCourses = startersCount + mainsCount + dessertsCount;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.searchBar}
          placeholder="Search dish..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.navbar}>
          <TouchableOpacity
            style={[styles.navButton, selectedCategory === 'Starters' && styles.activeButton]}
            onPress={() => setSelectedCategory('Starters')}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text style={[styles.navText, isPressed && styles.pressedText]}>Starters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, selectedCategory === 'Main' && styles.activeButton]}
            onPress={() => setSelectedCategory('Main')}
          >
            <Text style={styles.navText}>Main</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, selectedCategory === 'Desserts' && styles.activeButton]}
            onPress={() => setSelectedCategory('Desserts')}
          >
            <Text style={styles.navText}>Desserts</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.totalCoursesText}>Total Courses in {selectedCategory}: {totalCategoryCourses}</Text>
        <Text style={styles.totalCoursesText}>Total Courses (All Categories): {totalCourses}</Text>

        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item.id ? item.id.toString() : `${item.name}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={require('../../assets/main.jpeg')} style={styles.image} />
              <TouchableOpacity>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>R{item.price}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart', { items: cartItems })}
          >
            <Text style={styles.cartButtonText}>Go to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E5D7',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    width: 80,
    backgroundColor: '#7F4F24',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    zIndex: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    left: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 120,
    paddingHorizontal: 65,
    paddingVertical: 10,
    zIndex: 10,
    borderColor: '#7F4F24',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
    height: 40,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 70,
    marginBottom: 15,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
  },
  activeButton: {
    backgroundColor: '#7F4F24',
  },
  navText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  totalCoursesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E3B31',
    marginLeft: 60,
    marginBottom: 15,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderColor: '#D9B88C',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 70,
    marginBottom: 15,
  },
  itemTextContainer: {
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E3B31',
    marginBottom: 5,
    marginLeft: 60,
  },
  itemPrice: {
    fontSize: 16,
    color: '#7F4F24',
    marginBottom: 5,
    marginLeft: 100,
  },
  itemDescription: {
    fontSize: 16,
    color: '#6D4B3C',
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: '#7F4F24',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 110,
    marginLeft: 70,
    marginBottom: 20,
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    backgroundColor: '#7F4F24',
    paddingVertical: 15,
  },
  cartButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cartButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default MenuScreen;
