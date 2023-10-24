import { View, Text ,SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import { useRoute } from '@react-navigation/native'

const LoanProfilecreen = () => {

   const [loan, setLoan] = useState([]);
    const route = useRoute();
    const { contract } = route.params;

    useEffect(() => {
    setLoan(contract);
    }, [contract]);
    
  return (
    <>
    <HeaderTab title="Loan Profile" />
    <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.topContainer}>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.rowTitle}>Loan Code</Text>
                    <Text style={styles.rowLeftSubtitle}>{loan.contract_code}</Text>
                </View>
                <View>
                    <Text style={styles.rowTitle} >Loan Type</Text>
                    <Text style={styles.rowRightSubtitle}>Cash Loan</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.rowTitle}>Start Date</Text>
                    <Text style={styles.rowLeftSubtitle}>{loan.loan_start_date}</Text>
                </View>
                <View>
                    <Text style={styles.rowTitle}>Expected End Date</Text>
                    <Text style={styles.rowRightSubtitle}> {loan.loan_end_date}</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.rowTitle}>Request Amount</Text>
                    <Text style={styles.rowLeftSubtitle}>{loan.request_amount}</Text>
                </View>
                <View>
                    <Text style={styles.rowTitle}>Granted Amount</Text>
                    <Text style={styles.rowRightSubtitle}>{loan.loan_amount}</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.rowTitle}>Plan</Text>
                    <Text style={styles.rowLeftSubtitle}>{loan.plan} month</Text>
                </View>
                <View>
                    <Text style={styles.rowTitle}>Installment Amount</Text>
                    <Text style={styles.rowRightSubtitle}>{loan.installment_amount}</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.rowTitle}>Interest Rate</Text>
                    <Text style={styles.rowLeftSubtitle}>{loan.interest_rate}</Text>
                </View>
                <View>
                    <Text style={styles.rowTitle}>Interest Amount</Text>
                    <Text style={styles.rowRightSubtitle}>{loan.interest_amount}</Text>
                </View>
            </View>
        </View>
        
        <View style={[styles.middleContainer,styles.topContainer]}>
            <View style={styles.boxStyle}>
                <Text style={styles.leftboxSubtitle}>Total Paid</Text>
                <Text style={styles.leftboxTitle}>{loan.current_balance}</Text>
            </View>
            <View style={styles.rightBoxStyle}>
                <Text style={styles.rightBoxSubtitle}>Outstatnding Amount</Text>
                <Text style={styles.rightBoxTitle}>{loan.outstanding_amount}</Text>
            </View>
        </View>
        <View style={styles.topContainer}>
            <Text style={styles.title}>College Agent</Text>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>Agent Name</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.agent_name ?? "N/A"}</Text>
            </View>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>Agent College</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.college ?? "N/A" }</Text>
            </View>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>Agent Phone</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.agent_phone ?? "N/A"}</Text>
            </View>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>Attended Date</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.attended_date ?? "N/A"}</Text>
            </View>
            <Text style={styles.title}>Guarantor Detail</Text>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>FullName</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.guarantor_name ?? "N/A"}</Text>
            </View>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>Phone Number</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.guarantor_phone ?? "N/A"}</Text>
            </View>
            <View style={styles.agentContainer}>
                <Text style={styles.rowTitle}>Relationship</Text>
                <Text style={styles.rowLeftSubtitle}>{loan.guarantor_relation ?? "N/A"}</Text>
            </View>
        </View>
    </View>
        </ScrollView>
   
    </SafeAreaView>
   
    </>
    
  )
}

const styles =StyleSheet.create({
    container:{
        //height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 10
    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    rowTitle:{
     fontSize: 17,
     color: 'black',
     fontWeight: '600'
    },
    middleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    rowLeftSubtitle:{
        fontSize: 16,
        color: '#424242',
        marginTop: 5
    },
    rowRightSubtitle:{
        fontSize: 16,
        color: '#424242',
        marginTop: 5,
        textAlign: 'right'
    },
    boxStyle:{
        height: 70,
        width: 190,
        backgroundColor: 'rgba(7, 133, 134,0.2)',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 5
    },
    rightBoxStyle:{
        height: 70,
        width: 190,
        backgroundColor: 'rgba(255, 0, 0,0.2)',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 5
    },
    leftboxSubtitle:{
        color: 'rgba(7, 133, 134,0.9)',
        fontSize: 15
    },
    leftboxTitle:{
        color: 'rgba(7, 133, 134,0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 3
    },
    rightBoxSubtitle:{
        color: 'rgba(255, 0, 0,0.9)',
        fontSize: 15
    },
    rightBoxTitle:{
        color: 'rgba(255, 0, 0,0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 3
    },
    agentContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    topContainer:{
       // height: 170,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0,},
        shadowRadius: 10,
        elevation: 6,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 15
       // width: 100,
    },
})

export default LoanProfilecreen