import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTab from '../components/HeaderTab'
import InputProfile from '../components/InputProfile'
import { AuthContext } from '../context/AuthContext'

const AddressProfileScreen = () => {
  const [data , setData] =useState([]);

  const {customer} =useContext(AuthContext);

  useEffect(() => {
    setData(JSON.parse(customer));
  }, []);


  return (
    <>
   
    <HeaderTab title="Address Info" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
      <ScrollView style={{ marginTop: 15}}>
         <InputProfile icon="map-o" label="Region" text={data.region} />
         <InputProfile icon="map-o" label="District" text={data.district} />
         <InputProfile icon="map-o" label="Ward" text={data.region} />
         <InputProfile icon="map-signs" label="Street" text={data.street} />
         <InputProfile icon="calendar" label="Residence Since" text={data.resident_since}/>
       </ScrollView>
       <Footer />
    </SafeAreaView>
    </>
   
  )
}

export default AddressProfileScreen