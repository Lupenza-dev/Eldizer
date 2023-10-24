import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native';

const Footer = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const activeRoute = navigationState.routes[navigationState.index].name;
  const route = useRoute();
  const {logout} =useContext(AuthContext);


  let textHeaderColor;
  if (activeRoute === "HomeScreen" || activeRoute === "LoanScreen" || activeRoute === "PaymentScreen") {
    textHeaderColor = "#078586";
  } else {
    textHeaderColor = "#606060";
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 70,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff',
    },
    textHeader: {
      fontWeight: '600',
      fontSize: 13,
      marginTop: 5,
    },
  });

  return (
    <SafeAreaView>
       <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HomeScreen')}>
        <Icon
          name="home"
          type="antdesign"
          size={25}
          color={route.name === "HomeScreen" ? "#078586" : "#606060"}
        />
        <Text style={[styles.textHeader, { color: route.name === "HomeScreen" ? "#078586" : "#606060" }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LoanScreen')}>
        <Icon
          name="switcher"
          type="antdesign"
          size={25}
          color={route.name === "LoanScreen" ? "#078586" : "#606060"}
        />
        <Text style={[styles.textHeader, { color: route.name === "LoanScreen" ? "#078586" : "#606060" }]}>Loans</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PaymentScreen')}>
        <Icon
          name="database"
          type="antdesign"
          size={25}
          color={route.name === "PaymentScreen" ? "#078586" : "#606060"}
        />
        <Text style={[styles.textHeader, { color: route.name === "PaymentScreen" ? "#078586" : "#606060" }]}>Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => logout()}>
        <Icon
          name="logout"
          type="antdesign"
          size={25}
          color="#606060"
        />
        <Text style={styles.textHeader}>Logout</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
   
  );
};

export default Footer;
