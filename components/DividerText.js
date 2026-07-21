import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DividerText = (props) => {
  return (
    <View style={styles.textContainer}>
        <View style={styles.accentBar} />
        <Text style={styles.headerText}>{props.name}</Text>
        <View style={styles.dividerLine} />
    </View>
  )
}

export default DividerText

const styles = StyleSheet.create({
    textContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginHorizontal: 10,
        gap: 10,
      },
      accentBar:{
        width: 5,
        height: 22,
        borderRadius: 3,
        backgroundColor: '#272F3B',
      },
      headerText:{
        fontSize: 18,
        fontWeight: '700',
        color: '#272F3B',
        letterSpacing: 0.3,
      },
      dividerLine:{
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
      },
})