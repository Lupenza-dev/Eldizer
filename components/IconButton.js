import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './Icon';
import MediumText from './MediumText';


const IconButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonConatiner} activeOpacity={.8} onPress={props.onPress}>
      <View style={styles.iconBadge}>
        <Icon
            name={props.icon}
            type="font-awesome"
            size={16}
            color="#fff"
        />
      </View>
      <MediumText style={styles.buttonText} text={props.name} />
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
    buttonConatiner:{
        height: 54,
        backgroundColor: '#272F3B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        shadowColor: '#272F3B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    iconBadge:{
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 17,
        fontWeight: '600',
        color: '#fff'
    }
})