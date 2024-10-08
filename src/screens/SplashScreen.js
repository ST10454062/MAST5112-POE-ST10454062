import React from 'react';
import { View, Text, ImageBackground, Button, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/splashim.jpeg')} 
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>
          <Button
            title="Enter"
            onPress={() => navigation.navigate('Home')}
            color="#a67853" // Customize button color
          />
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
});

export default SplashScreen;
