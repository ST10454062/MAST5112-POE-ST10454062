import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,KeyboardAvoidingView, Platform, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';


const ChefMenuScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Main'); // Default to Main category
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [menuItems, setMenuItems] = useState([]);
  const [isPressed, setIsPressed] = useState(false); // Track if the button is pressed

  // Function to save menuItems to AsyncStorage
  const saveMenuItems = async (items) => {
    try {
      await AsyncStorage.setItem('menuItems', JSON.stringify(items));
    } catch (error) {
      console.log('Error saving menu items to AsyncStorage', error);
    }
  };

  // Function to load menuItems from AsyncStorage
  const loadMenuItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('menuItems');
      if (savedItems) {
        setMenuItems(JSON.parse(savedItems));
      }
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

  // Function to handle adding new items
  useEffect(() => {
    const newItem = navigation.getParam('newItem');

    if (newItem) {
      // Ensure the new item has a unique ID
      const newItemWithId = { ...newItem, id: Date.now().toString() };  // Generate a unique ID
      const updatedMenuItems = [...menuItems, newItemWithId];
      setMenuItems(updatedMenuItems);
      saveMenuItems(updatedMenuItems);  // Save to AsyncStorage
    }
  }, [navigation.getParam('newItem')]);



  // Function to handle removing an item
  const removeItem = (id) => {
    const updatedMenuItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedMenuItems);
    saveMenuItems(updatedMenuItems);  // Save updated list to AsyncStorage
  };

  // Filter items based on selected category and search query
  const filteredItems = menuItems.filter(item =>
    item.course === selectedCategory &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate total number of courses when button is pressed for that category
  const totalCategoryCourses = filteredItems.length;

  // Calculate average price for each category
  const calculateAveragePrice = (category) => {
    const categoryItems = menuItems.filter((item) => item.course === category);
    if (categoryItems.length === 0) return 0;
    const total = categoryItems.reduce((sum, item) => sum + item.price, 0);
    return (total / categoryItems.length).toFixed(2);
  };


    // Calculate total number of courses for each category
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
      {/* Add Item Button positioned in top-left corner */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search dish..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Navigation Bar for switching categories */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={[styles.navButton, selectedCategory === 'Starters' && styles.activeButton]} 
          onPress={() => setSelectedCategory('Starters')}
          onPressIn={() => setIsPressed(true)}   // Set pressed state to true when pressed
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

      {/* List of menu items based on the selected category */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require('../../assets/main.jpeg')}style={styles.image} />
            <TouchableOpacity>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R{item.price}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>

            {/* Remove Button */}
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => removeItem(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>HOME</Text>
        </TouchableOpacity>
      
        <Text style={styles.footerText}>    </Text>
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
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 25,
    paddingHorizontal: 65,
    paddingVertical: 10,
    zIndex: 10,
    borderColor: '#7F4F24',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
    height: 40,
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: '#fff', 
    borderColor: '#7F4F24',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10, // Ensures the button appears on top
    height: 40,
  },
  addButtonText: {
    color: '#000000',
    fontWeight: 'bold',
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
  activeText: {
    color: '#fff',
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
  scrollContainer: {
    paddingBottom: 100, // Ensure there's space at the bottom for the footer
  },
  card: {
    flexDirection: 'column',  // Stack items vertically
    backgroundColor: '#ffffff', // Soft beige/light brown card background
    borderRadius: 15, // Rounded corners
    padding: 10,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    elevation: 5,  // Shadow for Android
    shadowColor: '#000',  // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 },  // Shadow position
    shadowOpacity: 0.3,  // Shadow intensity
    shadowRadius: 8,  // Shadow blur radius
    borderColor: '#D9B88C',  // Light golden border
    borderWidth: 1,  // Border width
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 70,
    marginBottom: 15,
  },
  itemTextContainer: {
    marginBottom: 15, // Spacing before the button
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
  removeButton: {
    backgroundColor: '#7F4F24',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    backgroundColor: '#7F4F24',
    paddingVertical: 15,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ChefMenuScreen;