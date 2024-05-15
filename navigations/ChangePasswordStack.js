import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LandingScreen } from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import ChangePassword from '../screens/ChangePassword';



const ChangePasswordStack = () => {
    const Stack = createNativeStackNavigator();
    
  return (
    <>
    <Stack.Navigator screenOptions={{
      headerTintColor: "white",
      headerStyle:{
        backgroundColor: '#272F3B'
      }
    }}  initialRouteName={ChangePassword}>
    <Stack.Screen name='ChangePassword'  component={ChangePassword}  options={{
      headerShown: false
    }} />
    <Stack.Screen name='Bottom' component={DrawerNavigation} options={{ headerShown: false}}/>
    </Stack.Navigator>
    </>
  )
}

export default ChangePasswordStack