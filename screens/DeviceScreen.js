import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import Footer from '../components/Footer'
import Search from '../components/Search'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const DeviceScreen = () => {
 const navigation = useNavigation();
 const { userToken } = useContext(AuthContext);
 const [deviceData, setDeviceData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [refreshing, setRefreshing] = useState(false);

 const devices = () => {
   let config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: `${BASE_URL}/get-devices`,
     headers: { 
       'Authorization': `Bearer ${userToken}`, 
     }
   };
   setIsLoading(true);
   axios.request(config)
     .then((response) => {
       setIsLoading(false);
       setDeviceData(response.data.data);
     })
     .catch((error) => {
       setIsLoading(false);
       console.log(error.response);
     });
 };

 useEffect(() => {
   devices();
 }, []);

 const onRefresh = React.useCallback(() => {
   setRefreshing(true);
   devices();
   setTimeout(() => {
     setRefreshing(false);
   }, 2000);
 }, []);

 const chunkArray = (array, size) => {
   const result = [];
   for (let i = 0; i < array.length; i += size) {
     result.push(array.slice(i, i + size));
   }
   return result;
 };

 const deviceChunks = chunkArray(deviceData, 2); // Chunk deviceData into rows of 2 devices

 return (
   <>
     <HeaderTab title="Devices We Offer" />
     <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
       <Spinner
         visible={isLoading}
         textContent={'Loading...'}
         textStyle={{ color: '#FFF' }}
       />
       <Search />
       <ScrollView>
         <View style={styles.container}>
           {deviceChunks.map((chunk, i) => (
             <View key={i} style={styles.row}>
               {chunk.map((device, j) => (
                 <View key={j} style={styles.deviceCard}>
                   <Image style={styles.imageStyle} source={{ uri: device.image }} />
                   <View style={styles.textContainer}>
                     <Text style={styles.title}>Name</Text>
                     <Text style={styles.subTitle}>{device.name}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.title}>Amount</Text>
                     <Text style={styles.subTitle}>{device.price}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.title}>Initial Deposit</Text>
                     <Text style={styles.subTitle}>{device.initial_deposit}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.title}>Plan</Text>
                     <Text style={styles.subTitle}>{device.plan}</Text>
                   </View>
                   <TouchableOpacity
                     style={styles.buttonContainer}
                     onPress={() => navigation.navigate('LoanApplicationScreen', {
                       request_amount: device.price,
                       plan_applied: device.plan,
                       loan_type: 2,
                       device_name: device.name,
                       device_id: device.id
                     })}
                   >
                     <Text style={styles.buttonText}>Apply / Purchase</Text>
                   </TouchableOpacity>
                 </View>
               ))}
             </View>
           ))}
         </View>
       </ScrollView>
     </SafeAreaView>
     <Footer />
   </>
 )
}

export default DeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  deviceCard: {
    width: '48%', // Two cards per row, take 48% width each
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  imageStyle: {
    // width: '100%',
    // height: 150,
    // resizeMode: 'cover',
    // borderRadius: 8,
    // marginBottom: 5,
    aspectRatio: 1, 
    resizeMode: 'contain',
    // zIndex: 1
  },
  textContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    justifyContent: 'space-between'

  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '400',
  },
  buttonContainer: {
    backgroundColor: '#272F3B',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
