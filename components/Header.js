import { SafeAreaView, StyleSheet, Text, View ,Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { useLanguage } from '../utils/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Header = () => {
    const navigation = useNavigation();  
    const {language,changeLanguage ,t} = useLanguage();

    const insets = useSafeAreaInsets();
    const margin = Platform.OS === 'android' ? insets.top : 0;

    const handleLanguage = () => {
        const lang_value = language == "en" ? "sw" : "en";
        changeLanguage(lang_value)
     }

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.Subcontainer, { marginTop: margin }]}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.iconButton}
          activeOpacity={0.7}
        >
          <Icon
            name="bars"
            type="antdesign"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>{t("home")}</Text>

        <View style={styles.notificationContainer}>
          <TouchableOpacity
            onPress={() => handleLanguage()}
            style={styles.buttonContainer}
            activeOpacity={0.7}
          >
            {
              language == "en" && <Image style={styles.imageStyle} source={require('../assets/tz.png')} />
            }
            {
              language == "sw" && <Image style={styles.imageStyle} source={require('../assets/eng.png')} />
            }
            <Text style={styles.buttonTitle}>{language == "en" ? "SW" : "EN"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Icon
              name="bells"
              type="antdesign"
              size={20}
              color="#fff"
            />
            <View style={styles.subTextContainer}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#272F3B",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    headerText:{
        fontSize: 19,
        color: "#fff",
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    subTextContainer:{
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -2,
        top: -2,
        borderWidth: 1.5,
        borderColor: '#272F3B',
        paddingHorizontal: 3,
    },
    badgeText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
    },
    Subcontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    iconButton:{
        height: 42,
        width: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 21,
        marginRight: 12,
    },
    buttonTitle:{
      color: "#fff",
      fontWeight: '700',
      fontSize: 14,
    },
    imageStyle:{
       height: 20,
       width: 20,
       borderRadius: 10,
       resizeMode:'cover'
    },
    notificationContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    }
})
