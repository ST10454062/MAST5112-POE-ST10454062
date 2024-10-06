import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import ChefMenuScreen from './src/screens/ChefMenuScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import SplashScreen from './src/screens/SplashScreen';


const App = () => {
  useEffect(() => {
    const setFullScreen = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
    setFullScreen();
  }, []);


  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };



  const navigator = createStackNavigator(
    {
      ChefMenu: (props) => <ChefMenuScreen {...props} items={items} />,
      AddItem: (props) => <AddItemScreen {...props} addItem={addItem} />,
      Home: HomeScreen,
      Splash: SplashScreen,
      Menu: (props) => <MenuScreen {...props} items={items} />,
      Cart: (props) => <CartScreen {...props} items={items} />,
    },
    {
      initialRouteName: 'Splash',
      defaultNavigationOptions: {
        title: 'Christoffels Cafe',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#8B4513', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
        headerLeft: null, // This will remove the back button
      },
    }
  );
  const AppContainer = createAppContainer(navigator);
  return <AppContainer />;
};

export default App;
