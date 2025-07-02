import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import HeaderTab from '../components/HeaderTab'
import AssignmentCard from '../components/AssignmentCard'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import Spinner from 'react-native-loading-spinner-overlay'

const AssignMentScreen = () => {
    const {userToken} =useContext(AuthContext);
  const [assignment, setAssignment] =useState([]);
  const [isLoading,setIsLoading] =useState(false);

    const fetchAssignment=()=>{
    setIsLoading(true);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/get-assignments`,
        headers: { 
        'Authorization': `Bearer ${userToken}`, 
        }
    };
    axios.request(config)
    .then((response) => {
        setIsLoading(false);
        setAssignment(response.data.data);
    })
    .catch((error) => {
    // console.log(error);
        setIsLoading(false);
        console.log(error.response);
    });

    }
    useEffect(() => {
    fetchAssignment();
    }, []);
  return (
    <>
    <HeaderTab title="AssignMoney"/>
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1}}>
        <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
        />
        <View style={{ paddingHorizontal: 10}}>
        <View>
            <Text style={styles.title}>All Assignments</Text>
        </View>
        <View>
            {
                assignment.map((data,i)=>(
                 <AssignmentCard key={i} data={data}/>
                ))
            }
        </View>
        </View>
        

    </SafeAreaView>
    <Footer/>
    </>
  )
}

export default AssignMentScreen

const styles = StyleSheet.create({
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    }
})