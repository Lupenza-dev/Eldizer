import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View ,Text, StyleSheet ,Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Service = () => {
    const navigation = useNavigation();

  return (
    <View  style={styles.container}>
        <View style={styles.textContainer} >
          <Text style={styles.headerText}>Other Services</Text>
        </View>
        <View>
          <View style={styles.serviceContainer}>
        <TouchableOpacity style={styles.payButton} onPress={()=>navigation.navigate('DeviceScreen')}  >
            <Icon
            name="shoppingcart"
            type="antdesign"
            size={25}
            reverse
            color="#272F3B"
            /> 
            <Text style={styles.paytext}>Pay Later</Text> 
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.payButton}  >
            <Icon
            name="fork"
            type="antdesign"
            size={25}
            reverse
            color="#272F3B"
            /> 
            <Text style={styles.paytext}>Intern Loan</Text> 
        </TouchableOpacity> */}
        </View>
        </View>
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: "blue"
    },
    imageStyle:{
      marginTop: 40,
      width: 403,
      height: 110,
      // marginRight: 5
    },
    headerText:{
      fontSize: 22,
      fontWeight: 'bold',
      color: '#272F3B',
    },
    textContainer:{
      borderLeftWidth: 5,
      paddingLeft: 10,
      borderLeftColor: "#272F3B",
      marginBottom: 10
    },
    paytext:{
        fontSize: 15,
        paddingLeft: 10,
        fontWeight: 'bold'

    },
    payButton:{
        paddingLeft: 10,
        flexDirection: 'column',

    },
    serviceContainer:{
      flexDirection: 'row'
    }
    
    
})

export default Service