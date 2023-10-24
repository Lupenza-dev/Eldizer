import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const InputProfile = (props) => {
  return (
    <View style={styles.container}>
         <Icon
              name={props.icon}
              type="font-awesome"
              size={17}
              color="#606060"
            />
      <Text style={styles.title}>{props.label}</Text>
      <Text style={styles.subTitle}>{props.text ?? "N/A"}</Text>
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap: 10,
        height: 50,
        alignItems: 'center',
        marginHorizontal: 10,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginVertical: 5
    },
    title:{
        fontSize: 17,
        fontWeight: '500',
    },
    subTitle:{
        fontSize: 16,
    }
})

export default InputProfile