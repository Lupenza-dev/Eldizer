import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTab from '../components/HeaderTab'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import PhoneInput from '../components/PhoneInput'
import IconButton from '../components/IconButton'
import { useNavigation } from '@react-navigation/native'

const NmbScreen = () => {
 const navigation = useNavigation();

  return (
    <>
    <HeaderTab title="Link  NMB Account" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
    <View style={{ marginHorizontal: 10}}>
    <FormInput placeholder="NMB Account No" label="NMB Account No"
        value=""
        iconType="antdesign"
        iconName ="idcard"
    //     onChangeText={text => {
    //     setMiddlename(text);
    // }} 
    />
    <PhoneInput 
        placeholder="673******" 
        label="Phone number " 
        caption ="(Must be Used On NMB Account Registration)"
            value=""
    //         onChangeText={text => {
    //         setPhone(text);
    // }}
    />
     <FormInput placeholder="Provide OTP" label="One Time Pin (OTP)"
        value=""
        iconType="antdesign"
        iconName ="creditcard"
    />
    <View style={{ marginTop: 5, flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View style={styles.checkBoxStyle}></View>
        <Text style={styles.termsTextStyle}>By Click Here You  Accept Our Terms and Condition </Text>
    </View>
    <View style={{ marginVertical: 10}}>
    {/* <IconButton icon="arrow-circle-right" name="Submit Account Details"/> */}
    <IconButton icon="arrow-circle-right" onPress={()=>navigation.navigate('NmbRequestScreen')} name="Verify OTP"/>
    </View>
    
    </View>
    </SafeAreaView>
    <Footer />
    </>
  )
}

export default NmbScreen

const styles = StyleSheet.create({
    checkBoxStyle:{
        borderWidth: 1,
        padding: 10,
    },
    termsTextStyle:{
        fontSize: 13,
        fontWeight: '500'
    }
})