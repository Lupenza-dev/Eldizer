import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import PhoneInput from '../components/PhoneInput'
import IconButton from '../components/IconButton'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'

const NmbScreen = () => {
 const navigation = useNavigation();
 const [isLoading,setIsLoading] =useState(false);
 const {userToken} =useContext(AuthContext);

 const submitData=()=>{
    setIsLoading(true);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/subscribe`,
      headers: { 
        'Authorization': `Bearer ${userToken}`, 
      },
      data:{
        'username':"Eleanor.Nmbb.01",
        'password':"X!c7d23f46",
        'account_number':"6a94712e-c7da-4533-a572-e2a6bc220b2d",
      }
    };
    axios.request(config)
    .then((response) => {
      setIsLoading(false);
      console.log(response.data.message);
      Toast.show({
        type: 'success',
        text1: response.data.message,
        position: 'top'
      });
     // navigation.navigate('HomeScreen');
     // setAgents(response.data.data);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error.response.data);

      //notification(error.response.data.errors);
    });
  
  }

  return (
    <>
    <HeaderTab title="Link  NMB Account" />
    <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
    <View style={{ marginHorizontal: 10}}>
    <FormInput placeholder="NMB Account No" label="NMB Account No"
        value="6a94712e-c7da-4533-a572-e2a6bc220b2d"
        iconType="antdesign"
        iconName ="idcard"
    //     onChangeText={text => {
    //     setMiddlename(text);
    // }} 
    />
    {/* <PhoneInput 
        placeholder="673******" 
        label="Phone number " 
        caption ="(Must be Used On NMB Account Registration)"
            value=""
    //         onChangeText={text => {
    //         setPhone(text);
    // }}
    /> */}
     {/* <FormInput placeholder="Provide OTP" label="One Time Pin (OTP)"
        value=""
        iconType="antdesign"
        iconName ="creditcard"
    /> */}
     <FormInput placeholder="Username" label="Username"
        value="Eleanor.Nmbb.01"
        iconType="antdesign"
        iconName ="creditcard"
    />
     <FormInput placeholder="Password" label="Password"
        value="X!c7d23f46"
        iconType="antdesign"
        iconName ="creditcard"
        secureText={true}
    />
    {/* <View style={{ marginTop: 5, flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View style={styles.checkBoxStyle}></View>
        <Text style={styles.termsTextStyle}>By Click Here You  Accept Our Terms and Condition </Text>
    </View> */}
    <View style={{ marginVertical: 20}}>
    {/* <IconButton icon="arrow-circle-right" name="Submit Account Details"/> */}
    <IconButton icon="arrow-circle-right" onPress={submitData} name="SUbmit"/>
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