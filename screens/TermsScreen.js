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
          <ScrollView style={styles.container}>
      <Text style={styles.title}>BOOM ALLOWANCE SERVICE - TERMS AND CONDITIONS</Text>

      <Text style={styles.section}>Dear Customer,</Text>
      <Text style={styles.text}>
        The Terms and Conditions referred herein describe the rights and obligations of the Customer and the El-dizer financial service with regard to the Boom Allowance Loan...
      </Text>

      <Text style={styles.heading}>A: SPECIFIC TERMS AND CONDITIONS</Text>

      <Text style={styles.subheading}>1. Definitions</Text>
      <Text style={styles.text}>“Financial Institution” means Kindred Credit Union Limited.</Text>
      <Text style={styles.text}>“I”, “me”, “my” refers to the primary Credit Applicant, as applicable.</Text>
      <Text style={styles.text}>“Service Providers” means all of Financial Institution’s affiliates...</Text>

      <Text style={styles.subheading}>2. Amount</Text>
      <Text style={styles.text}>Loan amount ranges from TZS 1,000 to TZS 500,000, system generated...</Text>

      <Text style={styles.subheading}>3. Disbursement</Text>
      <Text style={styles.text}>Loan is disbursed directly into the Customer's account.</Text>

      <Text style={styles.subheading}>4. Expiry Date</Text>
      <Text style={styles.text}>Loan duration is 60 calendar days from disbursement date.</Text>

      <Text style={styles.subheading}>5. Repayment</Text>
      <Text style={styles.text}>
        5.1 Bullet repayment from meals and accommodation allowance. {"\n"}
        5.2 Non-deduction doesn't relieve payment liability.
      </Text>

      <Text style={styles.subheading}>6. Rate of Interest</Text>
      <Text style={styles.text}>
        Processing Fee 2%, Service Fee 2%, Verification 1%, Disbursement 1%, Insurance 0.5%, Interest 3.5% per month.
      </Text>

      <Text style={styles.heading}>B: OPERATIONAL TERMS AND CONDITIONS</Text>

      <Text style={styles.subheading}>7. Set Off and Consolidation Rights</Text>
      <Text style={styles.text}>
        El-dizer may consolidate accounts and liabilities without notice.
      </Text>

      <Text style={styles.subheading}>8. Early Payments</Text>
      <Text style={styles.text}>Allowed without penalties.</Text>

      <Text style={styles.subheading}>9. Availability</Text>
      <Text style={styles.text}>
        Subject to compliance with rules of BoT and other regulators.
      </Text>

      <Text style={styles.subheading}>10. Payment on Demand</Text>
      <Text style={styles.text}>El-dizer may recall the loan on notice.</Text>

      <Text style={styles.subheading}>11. Fees and Charges</Text>
      <Text style={styles.text}>Subject to amendment with notification.</Text>

      <Text style={styles.heading}>C: COVENANTS</Text>

      <Text style={styles.subheading}>12. Customer Agrees to:</Text>
      <Text style={styles.text}>
        12.1 Notify default events.{"\n"}
        12.2 Submit required information.{"\n"}
        12.3 Maintain liability parity.
      </Text>

      <Text style={styles.heading}>D: EVENTS OF DEFAULT</Text>

      <Text style={styles.subheading}>13. Conditions</Text>
      <Text style={styles.text}>
        Breach, non-payment, imprisonment, or allowances not channeled may trigger default.
      </Text>

      <Text style={styles.subheading}>14. Disclosure</Text>
      <Text style={styles.text}>
        El-dizer may request or share info with credit bureaus, banks, and regulators.
      </Text>

      <Text style={styles.subheading}>15. Currency Indemnity</Text>
      <Text style={styles.text}>
        If repaid in another currency, Customer bears the shortfall.
      </Text>

      <Text style={styles.subheading}>16. General Indemnity</Text>
      <Text style={styles.text}>
        Customer covers losses or costs due to default.
      </Text>

      <Text style={styles.subheading}>17. Costs and Fees</Text>
      <Text style={styles.text}>
        Customer liable for all legal and administrative costs, with interest.
      </Text>

      <Text style={styles.subheading}>18. Waiver</Text>
      <Text style={styles.text}>
        El-dizer’s waiver of rights does not remove future rights.
      </Text>

      <Text style={styles.subheading}>19. Government Fees</Text>
      <Text style={styles.text}>
        All taxes and levies are borne by the customer.
      </Text>

      <Text style={styles.subheading}>20. Force Majeure</Text>
      <Text style={styles.text}>
        Neither party liable for delays beyond control (e.g. war, disaster).
      </Text>

      <Text style={styles.subheading}>21. Law</Text>
      <Text style={styles.text}>
        Governed by Tanzanian law; dispute resolution within 14 days or court.
      </Text>

      <Text style={styles.subheading}>22. Acceptance</Text>
      <Text style={styles.text}>
        Clicking "Confirm" means you accept all terms and conditions. If not, choose "Do not Confirm Loan".
      </Text>

      <Text style={styles.signature}>Yours Faithfully,{"\n"}El-dizer Financial Service</Text>
    </ScrollView>
          </SafeAreaView>
        
        </>
  )
}

// const styles =StyleSheet.create({
//     container:{
//         margin: 10,
//         flexDirection: 'row',
//         gap: 5
//     },
//     numberContainer:{
//         height: 30,
//         width: 30,
//         backgroundColor: "rgba(7, 133, 134,0.1)",
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 50
//     },
//     textStyle:{
//         fontSize: 16,
//         marginVertical: 5,
//         fontWeight: '400'
//     },
//     textContainer:{
//         // width: '93%'
//         padding: 10
//     },
//     headerText:{
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginVertical: 3
//     }
// })

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' , paddingBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  subheading: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  section: { fontSize: 15, fontWeight: '500', marginTop: 10 },
  text: { fontSize: 14, marginTop: 4, lineHeight: 20 },
  signature: { marginTop: 20, fontSize: 14, fontStyle: 'italic' },
});


export default TermsScreen
