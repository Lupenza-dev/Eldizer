import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './navigations/AppNavigation';
import Toast from 'react-native-toast-message';


export default function App() {
  return (

    <View style={styles.container}>
      <StatusBar style="auto"  />
      <AuthProvider>
      <AppNavigation />
      </AuthProvider>
      <Toast />
    </View>
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
