import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/splashim.jpeg')} 
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.welcomeButton} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.welcomeButtonText}>Welcome</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginBottom: 50, // Adjust for positioning
    marginHorizontal: 50,
  },
  welcomeButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 100,
  },
  welcomeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 100,
  },
});

export default SplashScreen;
