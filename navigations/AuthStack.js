import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LandingScreen } from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import ChangePassword from '../screens/ChangePassword';



const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    
  return (
    <>
    <Stack.Navigator screenOptions={{
      headerTintColor: "white",
      headerStyle:{
        backgroundColor: '#272F3B'
      }
    }}  initialRouteName={LandingScreen}>
    <Stack.Screen name='LandingScreen'  component={LandingScreen}  options={{
      headerShown: false
    }} />
    <Stack.Screen  name='LoginScreen'  component={LoginScreen} options={{ headerShown: false}}  />
    <Stack.Screen name='Forgotpassword'  component={ForgotPasswordScreen} options={{ headerBackTitle: "", title: "Recover Password"}}  />
    <Stack.Screen name='RegisterScreen'  component={RegisterScreen} options={{ headerShown: true , headerTitle:"Registration", headerBackTitleVisible:false }} />
    <Stack.Screen name='ChangePassword'  component={ChangePassword} options={{ headerShown: false , headerTitle:"Registration", headerBackTitleVisible:false }} />
    {/* <Stack.Screen name='Bottom'  component={BottomTabNavigation} options={{ headerShown: false}} /> */}
    <Stack.Screen name='Bottom' component={DrawerNavigation} options={{ headerShown: false}}/>
    </Stack.Navigator>
    </>
  )
}

export default AuthStack