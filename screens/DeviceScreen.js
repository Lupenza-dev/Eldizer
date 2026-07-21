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
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../utils/GlobalStyles'

const DeviceScreen = () => {
 const navigation = useNavigation();
 const route = useRoute();
 const { userToken } = useContext(AuthContext);
 const [deviceData, setDeviceData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [refreshing, setRefreshing] = useState(false);

 const devices = (category = null) => {
   let url = `${BASE_URL}/get-devices`;
   if (category) {
     url += `?category=${category}`;
   }
   let config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: url,
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
   const { device_category } = route.params || {};
   console.log(device_category);
   devices(device_category);
 }, [route.params]);

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
     <SafeAreaView style={styles.screen}>
       <Spinner
         visible={isLoading}
         textContent={'Loading...'}
         textStyle={{ color: '#FFF' }}
       />
       <Search />
       <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.container}>
           {deviceChunks.map((chunk, i) => (
             <View key={i} style={styles.row}>
               {chunk.map((device, j) => (
                 <View key={j} style={styles.deviceCard}>
                   <View style={styles.imageWrapper}>
                     <Image style={styles.imageStyle} source={{ uri: device.image }} />
                   </View>
                   <View style={styles.cardBody}>
                     <Text style={styles.deviceName} numberOfLines={2}>{device.name}</Text>
                     <View style={styles.detailsGrid}>
                       <View style={styles.detailItem}>
                         <Text style={styles.detailLabel}>Amount</Text>
                         <Text style={styles.detailValue}>{device.price.toLocaleString()}</Text>
                       </View>
                       <View style={styles.detailItem}>
                         <Text style={styles.detailLabel}>Deposit</Text>
                         <Text style={styles.detailValue}>{device.initial_deposit.toLocaleString()}</Text>
                       </View>
                       <View style={styles.detailItem}>
                         <Text style={styles.detailLabel}>Plan</Text>
                         <Text style={styles.detailValue}>{device.plan}</Text>
                       </View>
                     </View>
                     <TouchableOpacity
                       style={styles.buttonContainer}
                       activeOpacity={0.8}
                       onPress={() => navigation.navigate('LoanApplicationScreen', {
                         request_amount: device.price - device.initial_deposit,
                         plan_applied: device.plan,
                         loan_type: 2,
                         device_name: device.name,
                         device_id: device.id,
                         initial_deposit: device.initial_deposit
                       })}
                     >
                       <Text style={styles.buttonText}>Apply / Purchase</Text>
                     </TouchableOpacity>
                   </View>
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
  screen: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deviceCard: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
  },
  imageWrapper: {
    backgroundColor: '#f8fafc',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  cardBody: {
    padding: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  detailsGrid: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
