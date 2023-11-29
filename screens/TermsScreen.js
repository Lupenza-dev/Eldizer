import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import axios from 'axios';

const TermsScreen = () => {
    const {userToken} =useContext(AuthContext);
    const [termData, setTermData] =useState([]);
    const [isLoading,setIsLoading]      =useState(false);
    const [refreshing, setRefreshing]   =useState(false);
  
  
  const terms=()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/get-terms`,
      headers: { 
        'Authorization': `Bearer ${userToken}`, 
      }
    };
    setIsLoading(true);
    axios.request(config)
    .then((response) => {
      setIsLoading(false);
     // console.log(response.data.data);
      setTermData(response.data.data);
    })
    .catch((error) => {
      setIsLoading(false);
     // console.log(error.response);
    });
  
  }
  useEffect(() => {
    terms();
  }, []);
  return (
        <>
          <HeaderTab title="Terms And Condition" />
          <SafeAreaView>
            <ScrollView>
                {/* <View style={styles.container}>
                    <View style={styles.numberContainer}>
                        <Text>1</Text>
                    </View>
                    <View>
                        <Text>loeeerem</Text>
                    </View>
                </View> */}
                {
                termData.map((term,i)=>{
                const iteration = i + 1;
               return <View key={i} style={styles.container}>
                    <View style={styles.numberContainer}>
                        <Text>{iteration}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{term.name}</Text>
                    </View>
                </View>
                })
            }
            </ScrollView>
          </SafeAreaView>
        
        </>
  )
}

const styles =StyleSheet.create({
    container:{
        margin: 10,
        flexDirection: 'row',
        gap: 5
    },
    numberContainer:{
        height: 30,
        width: 30,
        backgroundColor: "rgba(7, 133, 134,0.1)",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    textStyle:{
        fontSize: 18
    },
    textContainer:{
        width: '93%'
    }
})

export default TermsScreen
