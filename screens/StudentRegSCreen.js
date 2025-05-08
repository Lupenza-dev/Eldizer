import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormWizard from '../components/FormWizard'
import Footer from '../components/Footer'
import HeaderTab from '../components/HeaderTab'

const StudentRegSCreen = () => {
  return (
    <>
    <HeaderTab title="Student Registration" />
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
    <View>
      <FormWizard />
    </View>
    
    </SafeAreaView>
    <Footer/>
    </>
  )
}

export default StudentRegSCreen

const styles = StyleSheet.create({})