import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTab from '../components/HeaderTab'
import LoanCard from '../components/LoanCard'
import Search from '../components/Search'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'


const LoanScreen = () => {
  const {userToken} =useContext(AuthContext);
  const [loanData, setLoanData] =useState([]);
  const [isLoading,setIsLoading] =useState(false);
  //console.log(userToken);

  //const {userToken} =useContext(AuthContext);
const loans=()=>{
  setIsLoading(true);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/get-loans`,
    headers: { 
      'Authorization': `Bearer ${userToken}`, 
    }
  };

  axios.request(config)
  .then((response) => {
    setIsLoading(false);
    setLoanData(response.data.data);
  })
  .catch((error) => {
   // console.log(error);
    setIsLoading(false);
    console.log(error.response);
  });

}
useEffect(() => {
  loans();
}, []);

  return (

    <>
    <HeaderTab title="All Loans" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
      
       <ScrollView>
       <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
        <Search />
        {
      loanData.map((loan,i)=>{
        const iteration = i + 1;
        return <LoanCard key={i} iteration={iteration} data={loan} />
      })
      }
       </ScrollView>
       <Footer />
    </SafeAreaView>
  </>
  )
}

export default LoanScreen