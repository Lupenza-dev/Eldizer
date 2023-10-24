import { SafeAreaView, StyleSheet, Text, View ,Platform } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const HeaderTab = (props) => {
    const navigation = useNavigation();  
    let margin =0;
    if (Platform.OS === 'android') {
         margin =40;
    }
    
  return (
    <View style={[styles.container]}>
        <SafeAreaView style={[styles.safeContainer,{marginTop: margin}]}>
        <Icon onPress={()=>navigation.goBack()}
              name="left"
              type="antdesign"
              size={25}
              color="#fff"
        />
        <Text style={styles.headerText}>{props.title}</Text>
        <View>
        </View>
        </SafeAreaView>
        
    </View>
  )
}

export default HeaderTab

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#078586",
    },
    headerText:{
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold'
    },
    subTextContainer:{
        height: 20,
        width: 20,
        borderRadius: '50%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 15,
        top: -6
    },
    safeContainer:{
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 10
    }
})