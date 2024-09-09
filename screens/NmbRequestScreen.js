import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTab from '../components/HeaderTab'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import PhoneInput from '../components/PhoneInput'
import IconButton from '../components/IconButton'

const NmbRequestScreen = () => {
  return (
    <>
    <HeaderTab title="NMB Service Request" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
    <View style={{ marginHorizontal: 10}}>
        <View style={{ marginTop: 10}}>
            <Text style={styles.textStyle}>
                You will be deducted ____ to access the service 
            </Text>
            <Text style={styles.textStyle}>
                Required Meesage will be here
            </Text>
        </View>
     <FormInput placeholder="Provide OTP" label="One Time Pin (OTP)"
        value=""
        iconType="antdesign"
        iconName ="creditcard"
    />
    {/* <View style={{ marginTop: 5, flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View style={styles.checkBoxStyle}></View>
        <Text style={styles.termsTextStyle}>By Click Here You  Accept Our Terms and Condition </Text>
    </View> */}
    <View style={{ marginVertical: 10}}>
    {/* <IconButton icon="arrow-circle-right" name="Submit Account Details"/> */}
    <IconButton icon="arrow-circle-right" name="Verify OTP"/>
    </View>
    
    </View>
    </SafeAreaView>
    <Footer />
    </>
  )
}

export default NmbRequestScreen

const styles = StyleSheet.create({
    checkBoxStyle:{
        borderWidth: 1,
        padding: 10,
    },
    termsTextStyle:{
        fontSize: 13,
        fontWeight: '500'
    },
    textStyle:{
        fontSize: 16,
        fontWeight: '600'
    }
})