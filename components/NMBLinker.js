import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const NMBLinker = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.nmbContainer}>
        <View>
        <Text style={styles.nmbText}>Link Chuo Credit Account With NMB</Text>
        </View>
        <View>
        <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={()=>navigation.navigate('NmbScreen')} >
            <Text  style={styles.buttonText}> <Text>Press Here </Text></Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default NMBLinker

const styles = StyleSheet.create({
    nmbContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingVertical: 10,
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10
      },
      buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: 50,
        backgroundColor: '#272F3B',
        borderRadius: 10,
        margin: 10,
        padding: 10
      },
      buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500',
      },
      nmbText:{
        fontSize: 16,
        fontWeight: '600'
      }
})