import React, { useContext } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangePassword from '../screens/ChangePassword';
import ChangePasswordStack from './ChangePasswordStack';

const AppNavigation = () => {
  const {userToken,isPasswordChanged} =useContext(AuthContext);

  let navigationContent;

  if (isPasswordChanged == "No") {
    navigationContent = <ChangePasswordStack />;
  } else if (userToken) {
    navigationContent = <AppStack />;
  } else {
    navigationContent = <AuthStack />;
  }
  
  return (
    <NavigationContainer>
      {/* {userToken ? <AppStack /> : <AuthStack />} */}
      {navigationContent}
    </NavigationContainer>
  )
}

export default AppNavigation