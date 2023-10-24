import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigation from './BottomTabNavigation';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import HomeScreen from '../screens/HomeScreen';
import LoanScreen from '../screens/LoanScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import LoanProfilecreen from '../screens/LoanProfilecreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import DrawerNavigationExtended from './DrawerNavigationExtended';
import CollegeProfileScreen from '../screens/CollegeProfileScreen';
import AddressProfileScreen from '../screens/AddressProfileScreen';



const DrawerNavigation = () => {
    const Drawer =createDrawerNavigator();
    const navigation =useNavigation();
  return (
    <>
    <StatusBar
    animated={true}
    color="#fff"
    barStyle="light-content"
  />
    <Drawer.Navigator
    drawerContent={ prop => <DrawerNavigationExtended {...prop} />}
    gestureEnabled={false}
    screenOptions={{
      headerTintColor: "white",
      //  drawerActiveTintColor: 'white',
        //drawerActiveBackgroundColor: "#078586",
        headerShown: false,
        headerStyle:{
          backgroundColor: '#078586'
        }
    }}>
        <Drawer.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false}}/>
        <Drawer.Screen name='profileScreen' component={ProfileScreen} />
        <Drawer.Screen name="LoanApplicationScreen" component={LoanApplicationScreen} options={{ drawerItemStyle:{display: 'none'},headerTitle:"Loan Application"  ,headerLeft: () => (
        <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
          <Icon onPress={()=>navigation.goBack()}
              name="left"
              type="antdesign"
              size={22}
              color="#fff"
        />
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      ) }} />
        <Drawer.Screen name="LoanScreen" component={LoanScreen} options={{ drawerItemStyle:{display: 'none'} }} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} options={{ drawerItemStyle:{display: 'none'} }} />
        <Drawer.Screen name="LoanProfilecreen" component={LoanProfilecreen} options={{ drawerItemStyle:{display: 'none'} }} />
        <Drawer.Screen name="ApplicationScreen" component={ApplicationScreen} options={{ drawerItemStyle:{display: 'none'} }} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ drawerItemStyle:{display: 'none'} }} />
        <Drawer.Screen name="CollegeProfileScreen" component={CollegeProfileScreen} options={{ drawerItemStyle:{display: 'none'} }} />
        <Drawer.Screen name="AddressProfileScreen" component={AddressProfileScreen} options={{ drawerItemStyle:{display: 'none'} }} />
    </Drawer.Navigator>
    </>
  )
}

const styles =StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text:{
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 3
  }
})

export default DrawerNavigation

