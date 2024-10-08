import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

const AddItemScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
    // Stores the selected image URI
  const [file, setFile] = useState(null);
    // Stores any error message
  const [error, setError] = useState(null);

  const handleAddItem = () => {
    // Check if any field is empty
    if (!name || !course || !description || !price) {
      setError('!Please fill in all the fields!');
      return;
    }
  
    if (isNaN(parseFloat(price))) {
      setError('Price must be a number.');
      return;
    }
  
    // Clear the error if all fields are filled correctly
    setError('');
  
    // Create the new item
    const newItem = {
      name,
      course,
      description,
      price: parseFloat(price),
    };
  
    // Navigate to the menu with the new item
    navigation.navigate('ChefMenu', { newItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
      />

      <Text style={styles.label}>Course:</Text>
      {/* Use the dropdown for category selection */}
      <RNPickerSelect
        style={{
          inputAndroid: {
            ...styles.selector,
            backgroundColor: '#F5E1D2', 
            height: 40,
            borderColor: '#8B4513',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 30,
            paddingHorizontal: 10,
          },
          inputIOS: {
            ...styles.selector,
            backgroundColor: '#F5E1D2', 
          },
          placeholder: {
            color: '#888',
          },
        }}
        onValueChange={(value) => setCourse(value)}
        items={[
          { label: 'Starters', value: 'Starters' },
          { label: 'Main', value: 'Main' },
          { label: 'Desserts', value: 'Desserts' },
        ]}
        placeholder={{ label: 'Select a category', value: null }}
      />


      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        maxLength={80}
        onChangeText={setDescription}
        placeholder="Enter item description"
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter item price"
        keyboardType="numeric"
      />
      {/* Show error message if exists */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Add Item button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>    </Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5EDE2',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#8B4513',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: '#F5E1D2',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selector: {
    height: 40,
    borderColor: '#8B4513',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: '#F5E1D2',
  },
  footer: {
    backgroundColor: '#8B4513',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '300',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
});

export default AddItemScreen;






