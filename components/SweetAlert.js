import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'

const SweetAlert = (props) => {
    const [visible, setVisible] =useState(true);
    // const toggleAlert = React.useCallback(() => {
    //   setVisible(!visible);
    // }, [visible]);
    const handleClick=()=>{
        setVisible(false);
    }
  return (
    <View>
    {/* <TouchableOpacity onPress={toggleAlert}>
      <Text>Tap me</Text>
    </TouchableOpacity> */}

    
  </View>
  )
}

export default SweetAlert

const styles =StyleSheet.create({
    button:{
        height: 40,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'red',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonText:{
        color: "#fff",
        fontSize: 17,
        fontWeight: '800'
    },
    alertext:{
        fontSize: 18,
        marginTop: -16, 
        marginBottom: 32

    }
})
