import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [cartItems, setCartItems] = useState([]);

 // Function to load menu items from AsyncStorage
 const loadMenuItems = async () => {
  try {
    const savedItems = await AsyncStorage.getItem('menuItems');
    if (savedItems) {
      setMenuItems(JSON.parse(savedItems));
    }
    setIsLoading(false); // Set loading to false after loading
  } catch (error) {
    console.log('Error loading menu items from AsyncStorage', error);
    Alert.alert('Error', 'Failed to load menu items.');
    setIsLoading(false);
  }
};

// Load menu items when the component mounts
useEffect(() => {
  loadMenuItems();
}, []);



const handleAddToCart = async (newItem) => {
  try {
    const storedItems = await AsyncStorage.getItem('cartItems');
    const existingItems = storedItems ? JSON.parse(storedItems) : [];

    // Check if the item is already in the cart
    const updatedCart = [...existingItems, newItem];
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Update state and navigate to CartScreen
    setCartItems(updatedCart);
    navigation.navigate('CartScreen', { items: updatedCart });
  } catch (error) {
    console.log('Error adding item to cart: ', error);
  }
};


// Render individual menu items
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
    <Text style={styles.itemDescription}>{item.description}</Text>
    <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
      <Text style={styles.addButtonText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
);

  // Filter the first dish from each category for Chef's Choice
  const getDishFromCategory = (category) => {
    return menuItems.find((item) => item.course === category);
  };

  const startersDish = getDishFromCategory('Starters');
  const mainDish = getDishFromCategory('Main');
  const dessertsDish = getDishFromCategory('Desserts');

  const chefChoiceDishes = [startersDish, mainDish, dessertsDish].filter(Boolean); // Filter out undefined values

  // Calculate average price for each category
  const calculateAveragePrice = (category) => {
    const categoryItems = menuItems.filter((item) => item.course === category);
    if (categoryItems.length === 0) return 0;
    const total = categoryItems.reduce((sum, item) => sum + item.price, 0);
    return (total / categoryItems.length).toFixed(2);
  };

  const startersAveragePrice = calculateAveragePrice('Starters');
  const mainAveragePrice = calculateAveragePrice('Main');
  const dessertsAveragePrice = calculateAveragePrice('Desserts');

  return (
    <View style={styles.container}>
      {/* Display picture at the top */}
      <View style={styles.headerImageContainer}>
        <Image
          source={require('../../assets/splashim.jpeg')} // Replace with your image path
          style={styles.headerImage}
        />
      </View>

      <Text style={styles.sectionTitle}>Chef's Choice</Text>

      {/* Scrollable section for Chef's Choice */}
      <ScrollView style={styles.chefChoiceContainer}>
        {/* Display section for Starters */}
        {startersDish && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Starters</Text>
            <View style={styles.card}>
              <Image source={require('../../assets/main.jpeg')} style={{ width: 100, height: 100 }} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemName}>{startersDish.name}</Text>
                <Text style={styles.itemPrice}>R{startersDish.price}</Text>
                <Text style={styles.itemDescription}>{startersDish.description}</Text>
              </View>
            </View>
            <Text style={styles.averagePrice}>Avg Price: R{startersAveragePrice}</Text>
          </View>
        )}

        {/* Display section for Main Dish */}
        {mainDish && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Main</Text>
            <View style={styles.card}>
              <Image source={require('../../assets/main.jpeg')} style={{ width: 100, height: 100 }} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemName}>{mainDish.name}</Text>
                <Text style={styles.itemPrice}>R{mainDish.price}</Text>
                <Text style={styles.itemDescription}>{mainDish.description}</Text>
              </View>
            </View>
            <Text style={styles.averagePrice}>Avg Price: R{mainAveragePrice}</Text>
          </View>
        )}

        {/* Display section for Desserts */}
        {dessertsDish && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Desserts</Text>
            <View style={styles.card}>
              <Image source={require('../../assets/main.jpeg')} style={{ width: 100, height: 100 }} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemName}>{dessertsDish.name}</Text>
                <Text style={styles.itemPrice}>R{dessertsDish.price}</Text>
                <Text style={styles.itemDescription}>{dessertsDish.description}</Text>
              </View>
            </View>
            <Text style={styles.averagePrice}>Avg Price: R{dessertsAveragePrice}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {/* Navigation to MenuScreen */}
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.navButtonText}>Menu</Text>
        </TouchableOpacity>

        {/* Navigation to CartScreen */}
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ChefMenu')}>
          <Text style={styles.navButtonText}>Chef</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EDE2',
  },
  headerImageContainer: {
    alignItems: 'center',
    margin: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  chefChoiceContainer: {
    flexDirection: 'column',
  },
  categoryContainer: {
    margin: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 150,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    marginVertical: 10,
    overflow: 'hidden',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E3B31',
    marginBottom: 5,
    marginLeft: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#7F4F24',
    marginBottom: 5,
    marginLeft: 20,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  averagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'right',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    backgroundColor: '#7F4F24',
    paddingVertical: 15,
  },
  navButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

export default HomeScreen;
