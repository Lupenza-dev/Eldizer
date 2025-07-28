import { SafeAreaView, StyleSheet, Text, View ,Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { useLanguage } from '../utils/LanguageContext';


const Header = () => {
    const navigation = useNavigation();  
    const {language,changeLanguage ,t} = useLanguage();

   // const [marginValue,setMarginValue] =useState(0);
   let margin =0;
    if (Platform.OS === 'android') {
         margin =40;
    }

    const handleLanguage = () => {
        const lang_value = language == "en" ? "sw" : "en";
        changeLanguage(lang_value)
     }

  return (
    <SafeAreaView style={[styles.container]}>
         <View style={[styles.Subcontainer,{marginTop: margin}]}>
        <Icon onPress={()=>navigation.openDrawer()}
              name="bars"
              type="antdesign"
              size={30}
              color="#fff"
        />
        <Text style={styles.headerText}>{t("home")}</Text>
        <View style={styles.notificationContainer}>
        <TouchableOpacity onPress={()=>{handleLanguage()}} style={styles.buttonContainer}>
               {
                  language == "en" && <Image style={styles.imageStyle} source={require('../assets/tz.png')}/>
               }
               {
                  language == "sw" && <Image style={styles.imageStyle} source={require('../assets/eng.png')}/>
               }
            <Text style={styles.buttonTitle}>{ language == "en" ? "SW" : "EN"}</Text>
        </TouchableOpacity>
        <Icon
              name="bells"
              type="antdesign"
              size={30}
              color="#fff"
        />
        <View style={styles.subTextContainer} >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15}}>0</Text>
        </View>
        </View>
        
        
      
    </View>
    </SafeAreaView>
   
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#272F3B",
        color: "#fff",
        // padding: 10
    },
    headerText:{
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold'
    },
    subTextContainer:{
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: -6
    },
    Subcontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        gap: 5,
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    buttonTitle:{
      color: "#fff",
      fontWeight: 'bold',
      fontSize: 17
    },
    imageStyle:{
       height: 25,
       width: 25,
       resizeMode:'contain'
    },
    notificationContainer:{
        flexDirection: 'row'
    }
})