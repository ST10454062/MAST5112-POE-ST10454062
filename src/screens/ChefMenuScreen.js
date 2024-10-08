import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
    // Calculate total number of courses for each category
  const startersCount = menuItems.filter(item => item.course === 'Starters').length;
  const mainsCount = menuItems.filter(item => item.course === 'Main').length;
  const dessertsCount = menuItems.filter(item => item.course === 'Desserts').length;
  const totalCourses = startersCount + mainsCount + dessertsCount;


  return (
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
            <Image source={require('../../assets/main.jpeg')}style={{width: 100, height: 100}} />
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
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5EDE2',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 55,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    height: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
  },
  activeButton: {
    backgroundColor: '#8B4513', // Highlight active button
  },
  navText: {
    fontWeight: 'bold',
    color: '#000',
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
  image: {
    width: 2,
    height: 2,
    borderRadius: 2,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',

  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20, // More space between lines for better readability
    width: 150,
  },
  removeButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: '#F5E1D2', 
    borderColor: '#8B4513',
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
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 25,
    paddingHorizontal: 65,
    paddingVertical: 10,
    zIndex: 10,
    borderColor: '#8B4513',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#F5E1D2',
    height: 40,
  },
  totalCoursesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    bottom: 10,
    left: 160,
    backgroundColor: '#F5E1D2', 
    borderColor: '#8B4513',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10, // Ensures the button appears on top
    height: 40,
  },
  backButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#8B4513',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '300',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ChefMenuScreen;