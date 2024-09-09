import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';

const PhoneInput = (props) => {
  return (
    <>
    <View style={{ paddingTop: 10}}>
    <Text style={styles.textlabel}>{props.label}</Text>
    <View style={[styles.input]}> 
    <Image style={styles.image} source={ require('../assets/tz.png')} />
    <Text>+ 255 </Text>
    <TextInput 
      maxLength={9}
      style={styles.inputView}
     keyboardType='numeric'
     placeholder={props.placeholder}
      onChangeText={props.onChangeText} value={props.value ?? null} />
      
    </View>
    <Text style={styles.captionText}>{props.caption ?? null}</Text>
  </View>
   {/* <Text style={styles.caption}>{value} / 9</Text> */}
  </>
  )
}

export default PhoneInput

const styles = StyleSheet.create({
      input:{
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderColor: '#272F3B',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    textlabel:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        color: "#272F3B"
    },
    image:{
        height: 50,
        width: 40,
        borderRadius: 10
    },
    inputView:{
      height: 60,
      width: '100%',
    },
    caption:{
      marginTop: 5,
      marginBottom: -7,
      textAlign: 'right'
    },
    captionText:{
        fontSize: 12,
        marginTop: 5,
        color: 'red'
    }

})