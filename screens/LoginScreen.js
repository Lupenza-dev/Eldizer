import React, { useContext, useState } from 'react'
import { Image, ImageBackground, ScrollView, StatusBar,StatusBarStyle, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import ActivityLoad from '../components/ActivityLoad'
import CustomModal from '../components/CustomModal'
import { AuthContext } from '../context/AuthContext'
import MediumText from '../components/MediumText'
import IconButton from '../components/IconButton'
import pushNotification from '../pushNotification'

const LoginScreen = ({ navigation}) => {
    const {login,isLoading} =useContext(AuthContext);
    const [username ,setUserName] =useState(null);
    const [password ,setPassword] =useState(null);
    const [nameError,setNameError] =useState(false);
    const [passwordError,setPasswordError] =useState(false);
    const [expoPushToken] = pushNotification();

    const userLogin =(username, password)=>{
        if(!username){
            setNameError(true);
        }
        if (!password) {
            setPasswordError(true); 
        }

        if (username && password) {
            setNameError(false);
            setPasswordError(false);  
            login(username,password);
           
        }
       
       
    }
  return (
    <ScrollView  style={{ backgroundColor: '#fff', flex: 1 }}>
         <StatusBar
        animated={true}
        color="#fff"
        barStyle="light-content"
      />
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      
        <View style={styles.mainContainer}>
        <ImageBackground style={styles.imageStyle} source={require('../assets/studentbg.png')} >
            <View style={styles.textContainer}>
                <Image style={styles.minImageStyle} source={require('../assets/logo_min.png')} />
                {/* <Text style={styles.headerText}>LOGO</Text> */}
                <Text style={styles.headerText}>Tanzania's </Text>
                <Text style={styles.headerText}>Most Trusted Lender</Text>
            </View>
        </ImageBackground>
        <View style={styles.container}>
        <View>
            <MediumText style={styles.headertext} text="Welcome Back" />
            {/* <Text style={styles.headertext}>Welcome Back </Text> */}
        </View>
        <View>
            {/* <Text style={styles.textLabel}>Username</Text> */}
            <MediumText style={styles.textLabel}  text="Username"/>
            <TextInput placeholder='Write Username ' style={styles.textInput} value={username} onChangeText={text =>setUserName(text)} />
            {nameError ? <Text style={styles.textAlert}>Username required</Text>: ""}
            
        </View>
        <View>
            {/* <Text style={styles.textLabel}>Password</Text> */}
            <MediumText style={styles.textLabel}  text="Password"/>
            <TextInput placeholder='Write Password' secureTextEntry style={styles.textInput} onChangeText={text =>setPassword(text)} />
            {passwordError ? <Text style={styles.textAlert}>Password required</Text> : "" }
            
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>userLogin(username,password)}>
        <Text style={styles.buttonText}>Log in</Text>
         </TouchableOpacity >
        
         <Text  onPress={() => navigation.navigate('Forgotpassword')} style={styles.forgotPasswordText} >Forgot Password ?</Text>
         {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('RegisterScreen')}> */}
         {/* <Text  style={styles.forgotPasswordText} >Forgot Password ?</Text> */}
         <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={styles.buttonText}>Create Account</Text>
         </TouchableOpacity>

        <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <View style={styles.privacyContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('PrivacyScreen')}>
                    <Text style={styles.privacyText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TermsScreen')}>
                    <Text style={styles.privacyText}>Terms & Conditions</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: '300', fontSize: 11, marginBottom: 5 }}>This App is Owned By</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>El-dizer Financial Service</Text>
            </View>
        </View>
        </View>
        </View>
    </ScrollView>
  )
}

const styles =StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    container:{
        backgroundColor: '#fff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        padding: 20,
        marginTop: -80,
        flex: 1,
    },
    imageStyle:{
        width: '100%',
        height: 400,
        
    },
    headertext:{
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        fontWeight: '500',
        color: '#272F3B',
    },
    textLabel:{
        fontSize: 18,
        fontWeight: '500',
        color: '#A4A9AD'

    },
    textInput:{
        height: 60,
        borderWidth: 1,
        borderColor: '#A4A9AD',
        borderRadius: 10,
        padding: 5,
        marginTop: 5
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 57,
        backgroundColor: '#272F3B',
        borderRadius: 10,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 20
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
      },
      forgotPasswordText:{
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'right',
        marginTop: 16,
        marginBottom: 5
      },
      textContainer:{
        marginTop:'40%',
        padding: 5
     },
     headerText:{
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold'
     },
     minImageStyle:{
        height: 50,
        width: 50
     },
     textAlert:{
       // marginHorizontal: 10,
        color: 'red',
        marginVertical: 5,
        fontSize: 13
     },
     privacyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 'auto',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    privacyText: {
        marginHorizontal: 15,
        color: '#666',
        fontSize: 14,
    },
})

export default LoginScreen