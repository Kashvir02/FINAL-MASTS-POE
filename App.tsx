import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MenuProvider } from './MenuContext';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import ManageMenuScreen from './ManageMenuScreen';
import FilterMenuScreen from './FilterMenuScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: { backgroundColor: '#3E2723' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'HomeScreen' }}
          />

          <Stack.Screen
            name="ManageMenu"
            component={ManageMenuScreen}
            options={{ title: 'Add & Remove Items' }}
          />

          <Stack.Screen
            name="FilterMenu"
            component={FilterMenuScreen}
            options={{ title: 'Menu Filter' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

//Title: React Navigation
//Url: https://reactnative.dev/docs/navigation
//Date Accessed: 2025 12 November
//Date published: None

//Title: How to add splash creen in React Native
//Url: https://aboutreact.com/react-native-splash-screen/
//Date Accessed: 2025 12 November
//Date published: None

//Title:How to add styles
//Author:React native.dev
//url: https://reactnative.dev/docs/style
//Date Accessed: 2025 12 November
//Date published: None

//title: How to add filter screen 
//url: https://stackoverflow.com/questions/62731532/react-navigation-v5-use-drawer-to-filter-details-on-screen
//Date Accessed: 2025 12 November
//Date published: None


//Title: how to set up type script
//url: https://www.typescriptlang.org/download/
//Date Accessed: 2025 12 November
//Date published: None

//Title: How to add homescreen
//url: https://stackoverflow.com/questions/74878749/how-can-i-implement-add-to-homescreen-button-in-a-react-app
//Date Accessed: 2025 12 November
//Date published: None
