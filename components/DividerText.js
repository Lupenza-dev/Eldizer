import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DividerText = (props) => {
  return (
    <View>
        <View style={styles.textContainer} >
          <Text style={styles.headerText}>{props.name}</Text>
      </View>
    </View>
  )
}

export default DividerText

const styles = StyleSheet.create({
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#272F3B',
      },
      textContainer:{
        borderLeftWidth: 5,
        borderLeftColor: "#272F3B",
        marginBottom: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10
      }
})