import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
     
            },
            inputIOS: {
              ...styles.selector,
          
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}></Text>
      </View>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E5D7',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
    marginLeft: 150,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#7F4F24',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    marginLeft: 100,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#7F4F24',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 50,

  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 80,
  },
  selector: {
    borderColor: '#7F4F24',
    borderRadius: 5,
    margin: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    backgroundColor: '#7F4F24',
    paddingVertical: 15,
  },
});

export default AddItemScreen;






