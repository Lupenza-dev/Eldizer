import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {Icon } from 'react-native-elements'; 
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';



const LoanCard = (props) => {
    const navigation = useNavigation();

const handleLoanClick=(has_contract,contract,loan)=>{
    if (has_contract == "Yes") {
        navigation.navigate('LoanProfilecreen', { contract: contract, });
    } else {
        navigation.navigate('ApplicationScreen' ,{loan: loan});
    }
}
    
    const loan =props.data;
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => handleLoanClick(loan.has_contract,loan.contract,loan)}>
     <View >
        <View style={styles.topContainer}>
            <View style={styles.iconViewContainer}>
            <Icon
              name="user-o"
              type="font-awesome"
              size={20}
              color="#078586"
            />
            <Icon
              name="money"
              type="font-awesome"
              size={20}
              style={{ transform: [{ rotate: '90deg' }] }}
              color="#078586"
            />
            </View>
            <View>
            <Text style={styles.textHeader}>Personal Loan</Text> 
            <View style={styles.tableContainer}>
                <View>
                    <Text style={styles.tabletd}>Loan ID</Text>
                    <Text style={styles.tabletd}>Amount</Text>
                    <Text style={styles.tabletd}>Application Date</Text>
                </View>
                <View style={{ paddingLeft: 30}}>
                    <Text style={styles.tabletd}>{loan.loan_code}</Text>
                    <Text style={styles.tabletd}>{loan.amount.toLocaleString()}</Text>
                    <Text style={styles.tabletd}>{loan.application_date}</Text>
                </View>
            </View> 
            </View>
            
        </View>
        <View style={styles.bottomView}>
            <View>
            <Text style={styles.numberText}>TZS {loan.loan_amount.toLocaleString()}</Text>
            </View>
            <View style={styles.statusLabel}>
            <Text style={styles.statusText}>{loan.level}</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
   
  )
}

export default LoanCard

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        marginVertical: 5,
        height: 170,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0,},
        shadowRadius: 10,
        elevation: 6,
        backgroundColor: 'white',
       // width: 100,
    },
    leftContainer:{
        flexDirection: 'row',
        gap: 10

    },
    image:{
        height: 60,
        width: 60,
        marginLeft: 10,
    },
    textHeader:{
        fontSize: 20,
        fontWeight: '600',
    },
    numberText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    statusText:{
        fontSize: 15,
        fontWeight: '500',
        color: '#078586',
        fontWeight: 'bold'
    },
    topContainer:{
        flexDirection: "row",
        paddingTop: 20
    },
    tableContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconViewContainer:{
        flexDirection: 'row',
        backgroundColor: 'rgba(7, 133, 134,0.2)',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        borderRadius: 50,
        marginRight: 20
    },
    tabletd:{
        fontSize: 15,
        color: 'gray'
    },
    bottomView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 10
    },
    statusLabel:{
        backgroundColor: '#fff',
        height: 40,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#078586"
    }
})