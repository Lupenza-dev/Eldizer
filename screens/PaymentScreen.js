import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView ,RefreshControl } from 'react-native'
import { View, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTab from '../components/HeaderTab'
import PaymentCard from '../components/PaymentCard'
import Search from '../components/Search'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { useQuery } from '@tanstack/react-query'

const PaymentScreen = () => {
  const {userToken} =useContext(AuthContext);
  // const [paymentData, setPaymentData] =useState([]);
  // const [isLoading,setIsLoading]      =useState(false);
  const [refreshing, setRefreshing] =useState(false);


const payments = async ()=>{
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/get-payments`,
    headers: { 
      'Authorization': `Bearer ${userToken}`, 
    }
  };
 
  const response = await axios.request(config);
  return response.data.data;

}

const { data: paymentData = [], isLoading, refetch } = useQuery({
  queryKey: ['payments'],
  queryFn: payments,
});


// useEffect(() => {
//   payments();
// }, []);

const onRefresh = useCallback(() => {
  setRefreshing(true);
  refetch().finally(() => setRefreshing(false));
}, [refetch]);

  return (
    <>
    <HeaderTab title="All Payments" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
      <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
       <ScrollView
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } 
       >
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