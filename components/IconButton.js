import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import MediumText from './MediumText';


const IconButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonConatiner} activeOpacity={.8} onPress={props.onPress}>
      <MediumText style={styles.buttonText} text={props.name} />
      <Icon
          name={props.icon}
          type="font-awesome"
          size={25}
          reverse
          color="#078586"
      />
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
    buttonConatiner:{
        height: 60,
        backgroundColor: '#078586',
        // marginRight: 10,
        // marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})