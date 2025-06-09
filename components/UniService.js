import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native'

const UniService = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
            <Image source={ require('../assets/food.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>Msosi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
        <Image source={ require('../assets/network.png')} style={styles.imageStyle} />

        </View>
        <Text style={styles.serviceText}>Bundle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
        <Image source={ require('../assets/water.png')} style={styles.imageStyle} />

        </View>
        <Text style={styles.serviceText}>Maji</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceContainer}>
        <View style={styles.iconView}>
        <Image source={ require('../assets/shop.png')} style={styles.imageStyle} />

        </View>
        <Text style={styles.serviceText}>Maduka</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UniService

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