import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native';
import { useLanguage } from '../utils/LanguageContext';

const Footer = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const activeRoute = navigationState.routes[navigationState.index].name;
  const route = useRoute();
  const {logout} =useContext(AuthContext);
  const {t} =useLanguage();

  let textHeaderColor;
  if (activeRoute === "HomeScreen" || activeRoute === "LoanScreen" || activeRoute === "PaymentScreen") {
    textHeaderColor = "#272F3B";
  } else {
    textHeaderColor = "#606060";
  }

  const styles = StyleSheet.create({
    container: {
      height: 90,
      backgroundColor: '#fff',
    },
    Subcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      <View style={styles.Subcontainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HomeScreen')}>
        <Icon
          name="home"
          type="antdesign"
          size={25}
          color={route.name === "HomeScreen" ? "#272F3B" : "#606060"}
        />
        <Text style={[styles.textHeader, { color: route.name === "HomeScreen" ? "#272F3B" : "#606060" }]}>{t('home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LoanScreen')}>
        <Icon
          name="switcher"
          type="antdesign"
          size={25}
          color={route.name === "LoanScreen" ? "#272F3B" : "#606060"}
        />
        <Text style={[styles.textHeader, { color: route.name === "LoanScreen" ? "#272F3B" : "#606060" }]}>{t('loans')}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PaymentScreen')}>
        <Icon
          name="database"
          type="antdesign"
          size={25}
          color={route.name === "PaymentScreen" ? "#272F3B" : "#606060"}
        />
        <Text style={[styles.textHeader, { color: route.name === "PaymentScreen" ? "#272F3B" : "#606060" }]}>{t('payments')}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => logout()}>
        <Icon
          name="logout"
          type="antdesign"
          size={25}
          color="#606060"
        />
        <Text style={styles.textHeader}>{t('logout')}</Text>
      </TouchableOpacity>
      
    </View>
    <View style={{ marginVertical:5, alignItems: 'center' }}>
            <Text style={{ fontWeight: '300', fontSize: 11}}>This App is Owned By</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 12}}>Eldizer Financial Service</Text>
      </View>
      </View>
    </SafeAreaView>
   
  );
};

export default Footer;
