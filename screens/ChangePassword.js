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

const ChangePassword = () => {
    const [oldPassword, setOldPassword] =useState(null);
    const [password, setPassword] =useState(null);
    const [passwordConfirmation, setPasswordConfirmation] =useState(null);
    const {userToken} =useContext(AuthContext);
    const [isLoading,setIsLoading] =useState(false);

    const navigation = useNavigation();  

const changePassword = () => {
    if(oldPassword == null || password == null || passwordConfirmation == null){
        notification('Please fill all the fields','error');
    }
    else if(password != passwordConfirmation){
        notification('Password Must Match');
    }else if (password.length < 6 || passwordConfirmation < 6){
        notification('Password too short, 6 character required','error');
    }
    else{
        setIsLoading(true);
        axios.post(`${BASE_URL}/change-password`, {
            old_password: oldPassword,
            password:password,
            password_confirmation:passwordConfirmation
          }, {
            headers: {
            //  'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`
            }
          }).then(response => {
            setIsLoading(false);
            notification(response.data.message,'success');
            AsyncStorage.setItem('isPasswordChanged',"Yes");
            navigation.navigate('Bottom');
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
                <Text style={styles.subTitle}>Please Change the password to continue</Text>
            </View>
        </View>
        <View>
        <View>
        <FormInput placeholder="Enter Old Password ...." label="Old Password" 
                 value={oldPassword} 
                iconType="font-awesome"
                iconName ="unlock"
                onChangeText={text => {
                    setOldPassword(text);
                }}
        />
        <FormInput placeholder="Enter new Password ...." label="New Password" 
                 value={password} 
                iconType="font-awesome"
                iconName ="lock"
                onChangeText={text => {
                  setPassword(text);
                }}
        />
        <FormInput placeholder="Confirm New Password ...." label="Confirm Password" 
                 value={passwordConfirmation} 
                iconType="font-awesome"
                iconName ="lock"
                onChangeText={text => {
                  setPasswordConfirmation(text);
                }}
        />
        <View style={styles.buttonStyle}>
         <IconButton  icon="arrow-circle-right" name="Change Password" onPress={changePassword} />
        </View>
        </View>
        </View>
    </ScrollView>
    </SafeAreaView>
   
  )
}

export default ChangePassword

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