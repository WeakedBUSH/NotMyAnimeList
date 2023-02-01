import React, { useCallback, useEffect, useState } from 'react';
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import FavoriteScreen from "./screens/FavoriteScreen/FavoriteScreen";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export default function App() {
  // const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:'#F9FAFB'
    },
  };
  useEffect(() => {
    async function prepare() {
      try {
        
        await Font.loadAsync({  
          'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
          'Inter-Thin': require('./assets/fonts/Inter-Thin.otf'),
          'Inter-Light': require('./assets/fonts/Inter-Light.otf'),

      });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
<NavigationContainer  theme={MyTheme} onLayoutRootView={onLayoutRootView}>
      <Tab.Navigator initialRouteName='HomeScreen'  screenOptions={{ headerShown: false }}  >
      
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: (tabInfo) => {return (<Ionicons name="home-sharp"size={24} color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}/>); },}} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ tabBarIcon:  (tabInfo) => {return (<Ionicons name="heart-circle"size={24} color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}/>); },}} />

      </Tab.Navigator>
    </NavigationContainer>  
    );
}



