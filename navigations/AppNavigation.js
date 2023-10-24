import React, { useContext } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';


const AppNavigation = () => {
  const {userToken} =useContext(AuthContext);
  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
       
    </NavigationContainer>
  )
}

export default AppNavigation