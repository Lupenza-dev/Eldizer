import React from 'react'
import { View ,Text, StyleSheet ,Image } from 'react-native'

const LoanProcess = () => {
  return (
    <View  style={styles.container}>
        <View style={styles.textContainer} >
          <Text style={styles.headerText}>Loan Process</Text>
        </View>
        <Image style={styles.imageStyle} source={require('../assets/process.png')} />
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        margin: 20,
        justifyContent: 'center',
         height: 240,
        // borderWidth: 1,
        // borderColor: "blue"
    },
    imageStyle:{
      marginTop: 40,
      width: 403,
      height: 110,
      // marginRight: 5
    },
    headerText:{
      fontSize: 22,
      fontWeight: 'bold',
      color: '#078586',
    },
    textContainer:{
      borderLeftWidth: 5,
      paddingLeft: 10,
      borderLeftColor: "#078586",
    }
    
})

export default LoanProcess