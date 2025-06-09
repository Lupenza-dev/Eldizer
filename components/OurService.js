import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native'

const OurService = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
            <Image source={ require('../assets/money.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>Kopa Pesa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
            <Image source={ require('../assets/phone.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>Kopa Simu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
        <Image source={ require('../assets/laptop.png')} style={styles.imageStyle} />

        </View>
        <Text style={styles.serviceText}>Kopa Laptop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
        <Image source={ require('../assets/box.png')} style={styles.imageStyle} />

        </View>
        <Text style={styles.serviceText}>Pedi</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OurService

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 10,
    },
    iconView:{
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    serviceContainer:{
        flex: 1,
        borderWidth: .4,
        paddingVertical: 5,
        borderRadius: 8
    },
    serviceText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 3
    },
    imageStyle:{
        height: 40,
        width: 40
    }
})