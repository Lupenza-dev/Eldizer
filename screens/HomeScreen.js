import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useState } from 'react'
import { View ,Text, StyleSheet,ScrollView, SafeAreaView, RefreshControl} from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoanAppSlider from '../components/LoanAppSlider'
import LoanProcess from '../components/LoanProcess'
import Partners from '../components/Partners'
import { AuthContext } from '../context/AuthContext'
import { Icon } from 'react-native-elements';



const HomeScreen = () => {
  const {studentName,userInfo , isPasswordChanged} =useContext(AuthContext);
  const [refreshing, setRefreshing] =useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      
    }, 2000);
  }, []);

  return (
    <>
      <Header />
     <SafeAreaView style={{ backgroundColor: '#fff',flex:1, marginTop: 0}}> 
     <ScrollView style={styles.container} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } 
     >
        {/* <View style={styles.topContainer}>
          <View style={styles.subTopContainer}>
            <View>
            <Icon
                  name="user"
                  type="font-awesome"
                  size={40}
                  //reverse
                  color="#fff"
                />
            </View>
            <View style={styles.subTopRightContainer}>
            <Text style={[styles.headerTopContainer,{fontWeight: 'bold'}]}>Hi {studentName ?? ""}</Text>
            <Text style={styles.headerTopContainer}>You have {userInfo.loan_count ?? 0} Loans</Text>
            </View>
           
          </View>
          <View style={styles.amountContainer}>
              <Text style={styles.amountText} >{userInfo.total_amount ?? 0} TZS</Text>
              <Text style={styles.amountSubText}>Total Loan Amount</Text>
          </View>
          <View style={styles.downContainer}>
            <View style={styles.downLeftContainer}>
            <Text style={styles.headerDownText}>Request Amount</Text>
            <Text style={styles.subDownHeaderText}>{userInfo.amount ?? 0}</Text>
            </View>
            <View style={styles.downMiddleContainer}>
            <Text style={[styles.headerDownText,{color: "#272F3B"}]}>Outstandin Amount</Text>
            <Text style={[styles.subDownHeaderText,{color:"#272F3B"}]}>{userInfo.outstanding_amount ?? 0}</Text>
            </View>
            <View style={styles.downRightContainer}>
            <Text style={styles.headerDownText}>Payment Date</Text>
            <Text style={styles.subDownHeaderText}>{userInfo.payment_date ?? ""}</Text>
            </View>
            
          </View>
        </View> */}
        <LoanAppSlider />
        <LoanProcess />
        <Partners />
     </ScrollView>
     <Footer /> 
     </SafeAreaView>
    
    </>
   
  )
}

const styles =StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    //  flex: 1
  },
  textContainer:{
    margin: 10,
    borderLeftWidth: 5,
    paddingLeft: 10,
    borderLeftColor: "#272F3B",
  },
  headertext:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "#272F3B"
  },
  topContainer:{
    backgroundColor: "#272F3B",
    height: 260,
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  subTopContainer:{
    flexDirection: 'row',
  },
  subTopRightContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 15
  },
  headerTopContainer:{
    color: "#fff",
    fontSize: 16,
    fontWeight: '400',
  },
  amountText:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  }, 
  amountSubText:{
    fontSize: 18,
    fontWeight: '500',
    // textAlign: 'center',
     color: '#fff'
  },
  amountContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  downContainer:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
   // paddingHorizontal: 10,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 15
  },
  downLeftContainer:{
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  downMiddleContainer:{
   // backgroundColor: 'blue',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  downRightContainer:{
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-evenly',

  },
  headerDownText:{
    color: "#272F3B",
    fontSize: 12,
    fontWeight: 'bold'
  },
  subDownHeaderText:{
    color: "#272F3B",
    fontSize: 15,
    fontWeight: "bold"
  }

})

export default HomeScreen