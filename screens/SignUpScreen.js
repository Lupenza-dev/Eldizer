import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import NewForm from '../components/NewForm';
import PhoneInput from '../components/PhoneInput';
import { TouchableOpacity } from 'react-native';
import { colors } from '../utils/GlobalStyles';
import pushNotification from '../pushNotification';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const SignUpScreen = () => {
    const route = useRoute();
    const [expoPushToken] = pushNotification();
    const navigation = useNavigation();

    const { reg_type } = route.params;
    const[firstname,setFirstname] =useState("");
    const[middlename,setMiddlename] =useState("");
    const[lastname,setLastname] =useState("");
    const[email,setEmail] =useState("");
    const[password,setPassword] =useState("");
    const[confirmPassword,setConfirmPassword] =useState("");
    const [phone ,setPhone] =useState("");
    const [isLoading,setIsLoading]=useState(false);

    const [errorMessage, setErrorMessage] = useState({
      firstnameError: '',
      middlenameError: '',
      lastnameError:'',
      emailError: '',
      phoneError: '',
      passwordError: '',
      confirmError: '',
    });

    const submitData = async () => {
      if (validateForm()) {
         setIsLoading(true);
    const formData = new FormData();
    formData.append('first_name', firstname);
    formData.append('middle_name', middlename);
    formData.append('last_name', lastname);
    formData.append('phone_number', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('reg_type', reg_type);
    formData.append('expo_push_token', expoPushToken ?? null);
    try {
      const response = await axios.post(`${BASE_URL}/user-registration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: response.data.message ?? null,
        position: 'top',
      });
      navigation.navigate('LoginScreen');
    } catch (error) {
      setIsLoading(false);
      errorFunction(error.response.data.error_message ?? []);
    }
      } 
    }

    const validateForm = () => {
      if (!firstname) {
        updateErrorMessage('firstnameError','Firstname Field required 😡😡😡')
      }else if(!middlename){
        updateErrorMessage('middlenameError','Middlename Field required 😡😡😡')
      }
      else if(!lastname){
        updateErrorMessage('lastnameError','Lastname Field required 😡😡😡')
      }else if(!phone){
        updateErrorMessage('phoneError','Phone Number Field required 😡😡😡')
      }else if(!email){
        updateErrorMessage('emailError','Email Field required 😡😡😡')
      }else if(!password){
        updateErrorMessage('passwordError','Password Field required 😡😡😡')
      }else if(!confirmPassword){
        updateErrorMessage('confirmError','Confirm Password Field required 😡😡😡')
      }else if (password != confirmPassword ){
        notification('Password must match 😡😡😡');
      }
       else {
        return true;
      }
    }

    const updateErrorMessage =(errorKey,message) => {
      setErrorMessage(prevState => ({
        ...prevState,
        [errorKey]: message
      }));
    }

    const errorFunction = (errors) => {
      Object.keys(errors).forEach((key) => {
        errors[key].forEach((message) => {
          notification(message);
        });
      });
    };

    const notification = (message) => {
      Toast.show({
        type: 'error',
        text1: message,
        position: 'bottom'
      });
    };

    useEffect(() => {
     
    }, [expoPushToken]);

  return (
    <View style={styles.container}>
      <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
        <View>
            <Text style={styles.headerText}>{reg_type == 1 ? 'University Student':'Medical Intern'} Registration</Text>
        </View>
        <NewForm label="Enter Firstname" icon_name="user" icon_type="antdesign" value={firstname} 
             onChangeText={text => {
                setFirstname(text);
            }} 
            error={errorMessage.firstnameError} 
          />
        <NewForm label="Enter Middlename" icon_name="user" icon_type="antdesign" value={middlename} 
             onChangeText={text => {
                setMiddlename(text);
            }} 
            error={errorMessage.middlenameError} 
          />
        <NewForm label="Enter Lastname" icon_name="user" icon_type="antdesign" value={lastname} 
             onChangeText={text => {
              setLastname(text);
            }} 
            error={errorMessage.lastnameError} 
          />
           
        <NewForm label="Enter Phone" icon_name="phone" icon_type="antdesign" value={phone} 
             onChangeText={text => {
                setPhone(text);
            }} 
            error={errorMessage.phoneError} 
          />
        <NewForm label="Enter Email" icon_name="mail" icon_type="antdesign" value={email} 
             onChangeText={text => {
                setEmail(text);
            }} 
            error={errorMessage.emailError} 
          />
        <NewForm label="Enter Password" icon_name="lock" icon_type="antdesign" value={password} 
             onChangeText={text => {
                setPassword(text);
            }} 
            error={errorMessage.passwordError} 
          />
        <NewForm label="Enter Confirm Password" icon_name="lock" icon_type="antdesign" value={confirmPassword} 
             onChangeText={text => {
                setConfirmPassword(text);
            }} 
            error={errorMessage.confirmError} 
          />
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>submitData()}>
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