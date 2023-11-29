import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTab from '../components/HeaderTab'
import InputProfile from '../components/InputProfile'
import { AuthContext } from '../context/AuthContext'

const CollegeProfileScreen = () => {
  const [data , setData] =useState([]);

  const {student} =useContext(AuthContext);

  useEffect(() => {
    setData(student);
  }, []);
  return (
    <>
   
    <HeaderTab title="College Info" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
    <ScrollView style={{ marginTop: 15}}>
         <InputProfile icon="university" label="College Name" text={data.college_name} />
         <InputProfile icon="id-card-o" label="Form Four " text={data.index_no} />
         <InputProfile icon="id-card-o" label="Reg ID" text={data.student_reg_id} />
         <InputProfile icon="file-code-o" label="Course" text={data.course} />
         <InputProfile icon="calendar" label="Course Year" text={data.study_year} />
         <InputProfile icon="info" label="HESLB Status" text={data.heslb_status} />
       </ScrollView>
       <Footer />
    </SafeAreaView>
    </>
   
  )
}

export default CollegeProfileScreen