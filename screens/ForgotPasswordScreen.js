import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import FormInput from '../components/FormInput'
import IconButton from '../components/IconButton';
import Toast from 'react-native-toast-message'
import { BASE_URL } from '../utils/config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordScreen = () => {
    const [username, setUsername] =useState(null);
    const [otp , setOtp] = useState(null);
    const [isotpsent,setIsotpsent] =useState(false);
    const [realOtp,setRealOtp] =useState(null);
    const {userToken} =useContext(AuthContext);
    const [isLoading,setIsLoading] =useState(false);
    const [isPasswordReady,setIspasswordReady] =useState(false);
    const [password ,setPassword] =useState(null);
    const [confirmPassword ,setConfirmPassword] =useState(null);

    const navigation = useNavigation();  

const changePassword = () => {
   
    if(username == null){
        notification('Please fill all the fields','error');
    }else if((username && otp && isotpsent && realOtp ) && (!password || !confirmPassword)){
        if (realOtp != otp) {
          notification('OTP is not Correct , please provide the correct OTP','error');
        }else{
          setIspasswordReady(true);
        }
    }
    else{
        setIsLoading(true);
        if ((username && otp && isotpsent && realOtp && isPasswordReady )) {
            if ((password == null || confirmPassword == null)) {
              notification('Please fill all the fields','error');
            }else{
              if(password != confirmPassword){
                notification('Passwod doesnot match','error');
              }else{
              var url ='reset-password';
            }
            }
        } else {
          var url ='recover-password';
        }
        axios.post(`${BASE_URL}/${url}`, {
            user_name: username,
            password: password,
          }, {
            headers: {
            //  'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`
            }
          }).then(response => {
            setIsLoading(false);
            notification(response.data.message,'success');
            setRealOtp(response.data.otp);
            setIsotpsent(true);
            if (response.data.password_set) {
              navigation.navigate('LoginScreen');
            }
          }).catch(error => {
            setIsLoading(false);
            notification(error.response.data.error_message,'error');
            //console.log(error.response.data.error_message);
          });
    }
}

const notification =(message,type)=>{
    Toast.show({
      type: type,
      text1: message,
      position: 'top'
    });
};

  return (
    <SafeAreaView>
    <ScrollView style={styles.container}>
    <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
        <View style={styles.topContainer}>
            <View>
            <Image source={require('../assets/change_password.png')} style={styles.imageStyle}/>
            </View>
            <View>
                <Text style={styles.title}>Welcome at Chuo Credit</Text>
                <Text style={styles.subTitle}>Recover You Password</Text>
            </View>
        </View>
        <View>
        <View>
        <FormInput placeholder="Enter You Username ...." label="Username" 
                 value={username} 
                iconType="font-awesome"
                iconName ="user"
                onChangeText={text => {
                    setUsername(text);
                }}
        />
        {
          isotpsent ?
          <FormInput placeholder="Enter one time PIN ...." label="OTP" 
          value={otp} 
         iconType="font-awesome"
         iconName ="lock"
         onChangeText={text => {
           setOtp(text);
         }}
        />: ""
        }
        {isPasswordReady && (
          <>
            <FormInput
              placeholder="Enter new Password ...."
              label="New Password"
              value={password}
              iconType="font-awesome"
              iconName="lock"
              onChangeText={text => setPassword(text)}
            />
            <FormInput
              placeholder="Confirm New Password ...."
              label="Confirm Password"
              value={confirmPassword}
              iconType="font-awesome"
              iconName="lock"
              onChangeText={text => setConfirmPassword(text)}
            />
          </>
        )}
        <View style={styles.buttonStyle}>
         <IconButton  icon="arrow-circle-right" name="Recover Password" onPress={changePassword} />
        </View>
        </View>
        </View>
    </ScrollView>
    </SafeAreaView>
   
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container:{
        margin: 10
    },
    topContainer:{
        flexDirection: 'row',
        gap: 10,
        height: 150,
        alignItems:'center'
    },
    imageStyle:{
        height: 100,
        width: 100
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#272F3B'
    },
    subTitle:{
        fontSize: 15,
        color: 'black'
    },
    buttonStyle:{
        marginTop: 20
    }
})