import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  // Fetch the items from navigation params
  useEffect(() => {
    const cartItems = navigation.getParam('items', []); // Default to an empty array if no items are passed
    setItems(cartItems);
  }, [navigation]);

  const handleRemoveItem = async (itemToRemove) => {
    try {
      const updatedItems = items.filter(item => item.name !== itemToRemove.name);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update AsyncStorage
      setItems(updatedItems); // Update the state with the updated items
    } catch (error) {
      console.log('Error removing item from cart: ', error);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Clear the cart and show a thank you message
    setItems([]);
    AsyncStorage.removeItem('cartItems'); // Optionally clear AsyncStorage

    Alert.alert('Thank You!', 'Your payment has been processed. Thank you for dining with us!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'), // Navigate back to HomeScreen
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Price: R{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
          <Text style={styles.totalAmount}>Total Amount: R{calculateTotal()}</Text>
        </>
      )}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#FF6347', // Change to a noticeable color
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  totalAmount: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#8B4513',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartScreen;