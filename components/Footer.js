import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native';
import { useLanguage } from '../utils/LanguageContext';

const { width, height } = Dimensions.get('window');

const Footer = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const activeRoute = navigationState.routes[navigationState.index].name;
  const route = useRoute();
  const { logout } = useContext(AuthContext);
  const { t } = useLanguage();

  const navItems = [
    {
      name: 'HomeScreen',
      icon: 'home',
      label: t('home'),
    },
    {
      name: 'LoanScreen',
      icon: 'switcher',
      label: t('loans'),
    },
    {
      name: 'PaymentScreen',
      icon: 'database',
      label: t('payments'),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 8,
    },
    navContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: '#ffffff',
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderRadius: 12,
      marginHorizontal: 4,
      minHeight: 60,
    },
    activeNavItem: {
      backgroundColor: '#f3f4f6',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    activeIconContainer: {
      backgroundColor: '#272F3B',
    },
    textHeader: {
      fontSize: 11,
      fontWeight: '500',
      textAlign: 'center',
    },
    activeText: {
      color: '#272F3B',
      fontWeight: '600',
    },
    inactiveText: {
      color: '#6b7280',
    },
    logoutContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    brandContainer: {
      alignItems: 'center',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#f3f4f6',
      backgroundColor: '#fafafa',
    },
    brandText: {
      fontSize: 10,
      color: '#6b7280',
      fontWeight: '300',
    },
    brandName: {
      fontSize: 11,
      color: '#374151',
      fontWeight: '700',
      marginTop: 2,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.navContainer}>
          {navItems.map((item) => {
            const isActive = route.name === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(item.name)}
                style={[styles.navItem, isActive && styles.activeNavItem]}
              >
                <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                  <Icon
                    name={item.icon}
                    type="antdesign"
                    size={20}
                    color={isActive ? '#ffffff' : '#6b7280'}
                  />
                </View>
                <Text style={[
                  styles.textHeader,
                  isActive ? styles.activeText : styles.inactiveText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => logout()}
            style={styles.logoutContainer}
          >
            <View style={styles.iconContainer}>
              <Icon
                name="logout"
                type="antdesign"
                size={20}
                color="#ef4444"
              />
            </View>
            <Text style={[styles.textHeader, { color: '#ef4444' }]}>
              {t('logout')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>This App is Owned By</Text>
          <Text style={styles.brandName}>El-dizer Financial Service</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Footer;
