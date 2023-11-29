import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import { Icon } from 'react-native-elements'; 
import { useRoute } from '@react-navigation/native';

const ApplicationScreen = () => {
    const [data, setData] = useState([]);
    const route = useRoute();
    const { loan } = route.params;

    useEffect(() => {
        setData(loan);
    }, [loan]);
  return (
    <>
    <HeaderTab title="Loan Application Progress"/>
    <SafeAreaView style={{ marginHorizontal: 10}}>
        <ScrollView>
        <View style={styles.topContainer}>
           <Text style={styles.topTextStyle}>Status: {data.level}</Text>
           <Icon
            name="caretdown"
            type="antdesign"
            size={10}
            reverse
            color="#272F3B"
           />
        </View>
        <View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Request Amount</Text>
                <Text style={styles.rightTextSubContainer}>{data.amount}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Loan Amount</Text>
                <Text style={styles.rightTextSubContainer}>{data.loan_amount}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Plan</Text>
                <Text style={styles.rightTextSubContainer}>{data.plan}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Installment Amount</Text>
                <Text style={styles.rightTextSubContainer}>{data.installment_amount}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Interest Rate</Text>
                <Text style={styles.rightTextSubContainer}>{data.interest_rate}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Interest Amount</Text>
                <Text style={styles.rightTextSubContainer}>{data.interest_amount}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Start Date</Text>
                <Text style={styles.rightTextSubContainer}>{data.application_date}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>End Date</Text>
                <Text style={styles.rightTextSubContainer}>{data.loan_end_date}</Text>
            </View>
        </View>
        <View style={styles.agentContainer}>
            <Text style={styles.generalTitle}>Agent Details</Text>
        </View>
        <View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Agent Name</Text>
                <Text style={styles.rightTextSubContainer}>{data.agent ?? "N/A"}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Agent Phone</Text>
                <Text style={styles.rightTextSubContainer}>{data.agent_phone}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.leftTextSubContainer}>Attended Date</Text>
                <Text style={styles.rightTextSubContainer}>{data.agent_attended_date}</Text>
            </View>
            <View>
                <Text style={styles.leftTextSubContainer}>Loan Remark</Text>
                <View style={styles.textContainer}>
                    <ScrollView>
                    <Text style={styles.textInsideContainer} >
                        { data.agent_remark ?? "N/A"}
                    </Text>
                    </ScrollView>
                </View>

            </View>
        </View>
        {/* <View style={styles.agentContainer}>
            <Text style={styles.generalTitle}>Recommendation</Text>
        </View> */}
        {/* <View>
        <Text style={{...styles.leftTextSubContainer, marginTop: 10}}>Admin Remark</Text>
            <View style={styles.textContainer}>
                <ScrollView>
                <Text style={styles.textInsideContainer} >
                    {data.remark ?? "N/A"}
                </Text>
                </ScrollView>
            </View>
        </View> */}
        </ScrollView>
        
    </SafeAreaView>
    </>
  )
}


const styles =StyleSheet.create({
    topContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'rgba(7, 133, 134,0.1)',
        marginTop: 10,
        paddingHorizontal: 5,
        borderRadius: 5
    },
    topTextStyle:{
        fontSize: 18,
        fontWeight: '600',
        color: '#272F3B'
    },
    subContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 35,
        alignItems: 'center',
    },
    leftTextSubContainer:{
        fontSize: 17,
        fontWeight: '500'
    },
    rightTextSubContainer:{
        color: "#424242",
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right'
    },
    agentContainer:{
        height: 40,
        backgroundColor: 'rgba(7, 133, 134,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    textContainer:{
       // flexWrap: 'wrap',
        height: 100,
        borderColor: 'rgba(7, 133, 134,0.5)',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginTop: 5
    },
    textInsideContainer:{
        fontSize: 15
    },
    generalTitle:{
        fontSize: 18,
        fontWeight: '600',
        color: '#272F3B' 
    }


})

export default ApplicationScreen