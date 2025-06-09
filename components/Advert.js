import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Advert = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.buttonView}>
            <Image source={ require('../assets/speaker.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>Matangazo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.buttonView}>
            <Image source={ require('../assets/community.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>Groups</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Advert

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    imageStyle:{
        height: 30,
        width: 30
    },
    buttonView:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 17
    }
})