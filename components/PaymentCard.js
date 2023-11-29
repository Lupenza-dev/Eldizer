import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'; 


const PaymentCard = (props) => {
    const payment =props.data;
  return (
    <View style={styles.container}>
    <View style={styles.rightContainer}>
        <View style={styles.iconView}>
            <View style={styles.iconStyle}>
            <Icon
             name="money"
             type="font-awesome"
             size={30}
             style={{ transform: [{ rotate: '90deg' }] }}
             color="#272F3B"
            />
            </View>
        </View>
        <View style={styles.textContainer} >
            <Text style={styles.referenceTextStyle}>{payment.payment_reference}</Text>
            <Text style={styles.remarkTextStyle}>{payment.remarks}</Text>
            <Text style={styles.dateTextStyle}>{payment.payment_date}</Text>
        </View>
    </View>
    <View style={styles.amountContainer}>
        <View style={styles.statusLabel}>
        <Text style={styles.labelText}>{payment.status}</Text>
        </View>
        <Text style={styles.amountTextStyle}>{payment.amount.toLocaleString()} /=</Text>
    </View>
</View>
  )
}

export default PaymentCard

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        // width: '94%',
        // backgroundColor: 'white',
        margin: 10,
        height: 90,
        borderRadius: 10,
        borderColor: '#F6F6F6',
        borderWidth: 3,
        marginTop: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: 'white'
    },
    rightContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    iconView:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    iconStyle:{
        flexDirection: 'row',
         backgroundColor: 'rgba(7, 133, 134,0.2)',
         width: 50,
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 50
    },
    textContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        paddingVertical: 5
    },
    referenceTextStyle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    remarkTextStyle:{
        fontSize: 15,
        fontWeight: '400',
        color: '#606060'
    },
    dateTextStyle:{
        fontSize: 15,
        fontWeight: '700',
        color: '#606060'
    },
    amountContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    amountTextStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 15,
        color: "#272F3B"
    },
    statusLabel:{
        height: 25,
        backgroundColor: '#4BB543',
        justifyContent: 'center',
        borderRadius: 10,
        width: 100,
    },
    labelText:{
        fontSize: 12,
        textAlign: 'center',
        color: "#fff",
        fontWeight: "bold"
    }
})