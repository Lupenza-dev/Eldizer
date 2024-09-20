import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import NewForm from '../components/NewForm';
import PhoneInput from '../components/PhoneInput';
import { TouchableOpacity } from 'react-native';
import { colors } from '../utils/GlobalStyles';

const SignUpScreen = () => {
    const route = useRoute();
    const { reg_type } = route.params;
    const[firstname,setFirstname] =useState(null);
    const [phone ,setPhone] =useState(null);
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.headerText}>{reg_type == 1 ? 'University Student':'Medical Intern'} Registration</Text>
        </View>
        <NewForm label="Enter Firstname" icon_name="user" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
        <NewForm label="Enter Middlename" icon_name="user" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
        <NewForm label="Enter Lastname" icon_name="user" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
           
        <NewForm label="Enter Phone" icon_name="phone" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
        <NewForm label="Enter Email" icon_name="mail" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
        <NewForm label="Enter Password" icon_name="lock" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
        <NewForm label="Enter Confirm Password" icon_name="lock" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
          />
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>userLogin(username,password)}>
        <Text style={styles.buttonText}>Register</Text>
         </TouchableOpacity>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#272F3B',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 15
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerText:{
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary
    }
})