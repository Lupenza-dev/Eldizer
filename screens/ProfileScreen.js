import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTab from '../components/HeaderTab'
import InputProfile from '../components/InputProfile'
import { AuthContext } from '../context/AuthContext'

const ProfileScreen = () => {
  const [data , setData] =useState([]);

  const {customer} =useContext(AuthContext);

  useEffect(() => {
    setData(JSON.parse(customer));
  }, []);

  return (
    <>
   
    <HeaderTab title="Profile Info" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
       <ScrollView style={{ marginTop: 15}}>
         <InputProfile icon="user-o" label="Firstname" text={data.first_name ?? "N/A"} />
         <InputProfile icon="user-o" label="Middlename" text={data.middle_name ?? "N/A"}/>
         <InputProfile icon="user-o" label="Lastname" text={data.last_name ?? "N/A"}/>
         <InputProfile icon="user-o" label="Othername" text={data.other_name ?? "N/A"}/>
         <InputProfile icon="info" label="Gender" text={data.gender ?? "N/A"}/>
         <InputProfile icon="group" label="Marital Status" text={data.maritial_status ?? "N/A"}/>
         <InputProfile icon="calendar" label="DOB" text={data.dob ?? "N/A"}/>
         <InputProfile icon="id-card-o" label="ID Number" text={data.id_number ?? "N/A"}/>
         <InputProfile icon="envelope-o" label="Email" text={data.email ?? "N/A"}/>
         <InputProfile icon="phone" label="Phone" text={data.phone_number ?? "N/A"}/>
       </ScrollView>
       <Footer />
    </SafeAreaView>
    </>
   
  )
}

export default ProfileScreen