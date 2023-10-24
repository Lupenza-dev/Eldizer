import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTab from '../components/HeaderTab'
import PaymentCard from '../components/PaymentCard'
import Search from '../components/Search'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const PaymentScreen = () => {
  const {userToken} =useContext(AuthContext);
  const [paymentData, setPaymentData] =useState([]);
  const [isLoading,setIsLoading]      =useState(false);

const payments=()=>{
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/get-payments`,
    headers: { 
      'Authorization': `Bearer ${userToken}`, 
    }
  };
  setIsLoading(true);
  axios.request(config)
  .then((response) => {
    setIsLoading(false);
    console.log(response.data.data);
    setPaymentData(response.data.data);
  })
  .catch((error) => {
    setIsLoading(false);
    console.log(error.response);
  });

}
useEffect(() => {
  payments();
}, []);
  return (
    <>
    <HeaderTab title="All Payments" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
      <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
       <ScrollView >
       <Search />
       {
        paymentData.map((payment,i)=>{
          const iteration = i + 1;
          return <PaymentCard key={i} iteration={iteration} data={payment} />
        })
       }
       {/* <PaymentCard />
       <PaymentCard />
       <PaymentCard />
       <PaymentCard /> */}
       </ScrollView>
       <Footer />
    </SafeAreaView>
    </>
  )
}

export default PaymentScreen