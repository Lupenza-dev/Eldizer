import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View  ,Alert} from 'react-native';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import pushNotification from './pushNotification';
import * as Updates from 'expo-updates';
import { LanguageProvider } from './utils/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { iconFonts } from './components/Icon';
import * as SplashScreen from 'expo-splash-screen';
 
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(iconFonts);

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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
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
