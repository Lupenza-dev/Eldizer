import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BottomSheet } from 'react-native-btr'
import IconButton from './IconButton'
import LoanAppSlider from './LoanAppSlider'

const screenHeight =Dimensions.get('window').height;

const OurService = () => {
    const navigation =useNavigation();

    const [visible, setVisible] = useState(false);

    const toggleBottomNavigationView = () => {
        setVisible(!visible); 
    };

    const closeBottomSheetAndNavigate = (value) => {
        setVisible(false);
        navigation.navigate('LoanApplicationScreen', {
            request_amount: value,
            plan_applied: 1,
            loan_type: 1,
            device_name: null,
            device_id: null
        });
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.serviceContainer} onPress={toggleBottomNavigationView} >
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
      <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View style={{ margin: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: "#272F3B"
                }}> 
                Kopa Pesa
              </Text>
             <View>
                <LoanAppSlider onApply={closeBottomSheetAndNavigate} />
             </View>
            </View>
          </View>
        </BottomSheet>
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
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        height: screenHeight * 0.40,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        
      },
})