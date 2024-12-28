import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { colors } from '../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native'

const WarningCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Icon name='warning' type='antdesign' size={28} reverse={true} color={colors.warning}/>
        </View>
        <View>
            <Text style={styles.title}>Please complete registration in order  {'\n'}to be able to use our service</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={()=>navigation.navigate('StudentRegSCreen')} >
              <Text  style={styles.buttonText}> <Text>Complete Registration </Text></Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default WarningCard

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    title:{
        fontSize: 18,
        fontWeight: '500'

    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
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
      iconContainer:{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
      }
})