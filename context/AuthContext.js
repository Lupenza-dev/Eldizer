import React,{createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { BASE_URL } from '../utils/config';
import CustomModal from '../components/CustomModal';
import Toast from 'react-native-toast-message'
import Spinner from 'react-native-loading-spinner-overlay';


export const AuthContext =createContext();

export const AuthProvider =({ children })=>{
    const [userToken ,setUserToken]    =useState(null);
    const [userInfo ,setUserInfo]      =useState([]);
    const [studentName,setStudentName] =useState(null);
    const [customer,setCustomer]       =useState([]);
    const [student,setStudent]         =useState([]);
    const [customerName,setCustomerName]  =useState([]);
    const [image,setImage]                =useState([]);
    const [email,setEmail]                =useState([]);
    const [isLoading ,setIsLoading]       =useState(false);

      
    const login =(username,password)=>{
          setIsLoading(true);
          axios.post(`${BASE_URL}/user-authentication`, {
             email: username,
             password: password,
            // email:"admin@gmail.com",
            // password: "Admin@123"
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            console.log(response.data.data.customer);
             const userInfos    =response.data.data;
             const token        =response.data.token;
             const studentName  =response.data.data.name;
             const customer     =response.data.data.customer;
             const customerName     =response.data.data.customer.customer_name;
             const email             =response.data.data.customer.email;
             const image             =response.data.data.customer.image;
             const student           =response.data.data.customer.student;
        //     toastNotification(userInfos.message,'success');
            setUserInfo(userInfos);
            setUserToken(token);
            setStudentName(studentName);
            setCustomer(customer);
            setStudent(student);
            setCustomerName(customerName);
            setEmail(email);
            setImage(image);
            setIsLoading(false);
        //     //console.log(userInfos);
           AsyncStorage.setItem('userToken',token);
           AsyncStorage.setItem('studentName',studentName);
            AsyncStorage.setItem('userInfo',userInfo);
            AsyncStorage.setItem('customer',JSON.stringify(customer));
            AsyncStorage.setItem('student',JSON.stringify(student));
            AsyncStorage.setItem('customerName',JSON.stringify(customerName));
            AsyncStorage.setItem('email',JSON.stringify(email));
            AsyncStorage.setItem('image',JSON.stringify(image));
          }).catch(error => {
            setIsLoading(false);
            // const api_error =error.response.data.error_message;
            // toastNotification(api_error,'error');
            console.log(error.response);
            Toast.show({
              type: 'error',
              text1: error.response.data.error_message,
              position: 'top'
            });
          });
     
    }
    const logout =()=>{
        setUserToken(null);
        setUserInfo(null);
        setStudentName(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('studentName');
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('customer');
        AsyncStorage.removeItem('student');
        AsyncStorage.removeItem('customerName');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('image');
    }

    const isLogedin =async()=>{
        try {
        let userToken =await AsyncStorage.getItem('userToken');
        let studentName =await AsyncStorage.getItem('studentName');
        let userInfo =await AsyncStorage.getItem('userInfo');
        let customer =await AsyncStorage.getItem('customer');
        let student  =await AsyncStorage.getItem('student');
        let customerName  =await AsyncStorage.getItem('customerName');
        let email  =await AsyncStorage.getItem('email');
        let image  =await AsyncStorage.getItem('image');

        setUserToken(userToken);
        setStudentName(studentName);
        setUserInfo(userInfo);
        setCustomer(customer);
        setStudent(student);
        setCustomerName(customerName);
        setEmail(email);
        setImage(image);

        } catch (error) {
            console.log("is loged in error" + error); 
        }
    }

    useEffect(()=>{
        isLogedin();
    },[]);
    return <AuthContext.Provider value={{login ,logout,userToken,studentName,userInfo,isLoading,customer,student,customerName,email,image}}>
        {children}
       
    </AuthContext.Provider>
}