import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useState } from 'react'
import { View ,Text, StyleSheet,ScrollView, SafeAreaView} from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoanAppSlider from '../components/LoanAppSlider'
import LoanProcess from '../components/LoanProcess'
import Partners from '../components/Partners'
import { AuthContext } from '../context/AuthContext'
import { Icon } from 'react-native-elements';



const HomeScreen = () => {
  const {studentName,userInfo} =useContext(AuthContext);
  const [user,setUser] =useState(null);
 // let userinfos =AsyncStorage.getItem('userToken');
 // alert(userInfo);
 const onLoad =async()=>{
  try {
  let userInfos =await AsyncStorage.getItem('userInfo');
  setUser(userInfos);
  } catch (error) {
      console.log("is loged in error" + error); 
  }
}
 console.log(user);
  return (
    <>
      <Header />
     <SafeAreaView style={{ backgroundColor: '#fff',flex:1, marginTop: 0}}> 
     <ScrollView style={styles.container} >
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
            <Text style={[styles.headerDownText,{color: "#078586"}]}>Outstandin Amount</Text>
            <Text style={[styles.subDownHeaderText,{color:"#078586"}]}>{userInfo.outstanding_amount ?? 0}</Text>
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
    borderLeftColor: "#078586",
  },
  headertext:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "#078586"
  },
  topContainer:{
    backgroundColor: "#078586",
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
    color: "#078586",
    fontSize: 12,
    fontWeight: 'bold'
  },
  subDownHeaderText:{
    color: "#078586",
    fontSize: 15,
    fontWeight: "bold"
  }

})

export default HomeScreen