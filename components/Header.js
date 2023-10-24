import { SafeAreaView, StyleSheet, Text, View ,Platform } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
    const navigation = useNavigation();  
   // const [marginValue,setMarginValue] =useState(0);
   let margin =0;
    if (Platform.OS === 'android') {
         margin =40;
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
        <Text style={styles.headerText}>Home</Text>
        <View>
        <Icon
              name="bells"
              type="antdesign"
              size={30}
              color="#fff"
        />
        <View style={styles.subTextContainer} >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15}}>1</Text>
        </View>
        </View>
        
        
      
    </View>
    </SafeAreaView>
   
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#078586",
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
        left: 15,
        top: -6
    },
    Subcontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    }
})