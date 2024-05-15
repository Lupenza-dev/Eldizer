import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View  ,Alert} from 'react-native';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import pushNotification from './pushNotification';
import * as Updates from 'expo-updates';
 
export default function App() {
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
    onFetchUpdateAsync();
  }, []);


  return (
    <GestureHandlerRootView style={{ flex: 1}}>
       <View style={styles.container}>
      <StatusBar style="auto"  />
      <AuthProvider>
      <AppNavigation />
      </AuthProvider>
      <Toast />
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
