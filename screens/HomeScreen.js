import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import Spinner from 'react-native-loading-spinner-overlay'

const HomeScreen = () => {
  const navigation =useNavigation();
  const {userToken} =useContext(AuthContext);
  const [groupData, setgroupData] =useState([]);
  const [adsData, setadsData] =useState([]);
  const [isLoading,setIsLoading] =useState(false);
  //console.log(userToken);

  //const {userToken} =useContext(AuthContext);
    const adsGroupFetch=()=>{
    setIsLoading(true);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/get-groups-ads`,
        headers: { 
        'Authorization': `Bearer ${userToken}`, 
        }
    };
    axios.request(config)
    .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setgroupData(response.data.groups);
        setadsData(response.data.ads);
    })
    .catch((error) => {
    // console.log(error);
        setIsLoading(false);
        console.log(error.response);
    });

    }
    useEffect(() => {
    adsGroupFetch();
    }, []);

  return (
    <>
    <Header/>
    <SafeAreaView style={{ backgroundColor: '#fff',flex:1, marginTop: 0}}>
        <ScrollView>
        <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
       <CoinCard/>
       <View style={{ marginTop: 2}}>
       <NMBLinker/>
       </View>
       <View>
            <DividerText name="Assighn Money"/>
            <View style={{ paddingHorizontal: 10}}>
            <IconButton  name="Quizz" icon="edit" onPress={() => navigation.navigate('AssignMentScreen')}/>
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
        <Advert  adData ={adsData} groupData={groupData}/>
       </View>
       </ScrollView>
    </SafeAreaView>
    <Footer/>
    </>
   
  )
}

export default HomeScreen

const styles = StyleSheet.create({})