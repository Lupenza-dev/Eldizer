import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View  ,Alert} from 'react-native';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import pushNotification from './pushNotification';
import * as Updates from 'expo-updates';
import { LanguageProvider } from './utils/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
 
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'anticon': require('./assets/icon-fonts/anticon.ttf'),
    'entypo': require('./assets/icon-fonts/entypo.ttf'),
    'evilicons': require('./assets/icon-fonts/evilicons.ttf'),
    'feather': require('./assets/icon-fonts/feather.ttf'),
    'FontAwesome': require('./assets/icon-fonts/FontAwesome.ttf'),
    'FontAwesome5Free-Brand': require('./assets/icon-fonts/FontAwesome5Free-Brand.ttf'),
    'FontAwesome5Free-Regular': require('./assets/icon-fonts/FontAwesome5Free-Regular.ttf'),
    'FontAwesome5Free-Solid': require('./assets/icon-fonts/FontAwesome5Free-Solid.ttf'),
    'Fontisto': require('./assets/icon-fonts/Fontisto.ttf'),
    'foundation': require('./assets/icon-fonts/foundation.ttf'),
    'ionicons': require('./assets/icon-fonts/ionicons.ttf'),
    'material': require('./assets/icon-fonts/material.ttf'),
    'material-community': require('./assets/icon-fonts/material-community.ttf'),
    'octicons': require('./assets/icon-fonts/octicons.ttf'),
    'simple-line-icons': require('./assets/icon-fonts/simple-line-icons.ttf'),
    'zocial': require('./assets/icon-fonts/zocial.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    //onFetchUpdateAsync();
  }, []);

  const queryClient = new QueryClient();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
       <View style={styles.container}>
      <StatusBar style="auto"  />
      <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <AuthProvider>
      <AppNavigation />
      </AuthProvider>
      <Toast />
      </LanguageProvider>
      </QueryClientProvider>
    </View>
    </GestureHandlerRootView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#red',
    // marginLeft: 5,
    // marginRight: 5
  },
});
