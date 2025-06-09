import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CoinCard from '../components/CoinCard'
import DividerText from '../components/DividerText'
import NMBLinker from '../components/NMBLinker'
import IconButton from '../components/IconButton'
import Service from '../components/Service'
import OurService from '../components/OurService'
import UniService from '../components/UniService'
import Advert from '../components/Advert'

const HomeScreen = () => {
  return (
    <>
    <Header/>
    <SafeAreaView style={{ backgroundColor: '#fff',flex:1, marginTop: 0}}>
        <ScrollView>
       <CoinCard/>
       <View style={{ marginTop: 2}}>
       <NMBLinker/>
       </View>
       <View>
            <DividerText name="Assighn Money"/>
            <View style={{ paddingHorizontal: 10}}>
            <IconButton  name="Quizz" icon="edit"/>
            </View>
       </View>
       <View style={{ marginVertical: 10}}>
       <DividerText name="Pay Later"/>
       <OurService />
       </View>
       <View>
       <DividerText name="Unipayment"/>
       <UniService/>
       </View>
       <View>
        <Advert />
       </View>
       </ScrollView>
    </SafeAreaView>
    <Footer/>
    </>
   
  )
}

export default HomeScreen

const styles = StyleSheet.create({})