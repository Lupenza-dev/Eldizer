import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity ,ScrollView } from 'react-native'
import React ,{useContext, useEffect, useState} from 'react'
// import { ScrollView } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements';
import FormInput from '../components/FormInput';
import IconButton from '../components/IconButton';
import { BottomSheet } from 'react-native-btr';
import HeaderTab from '../components/HeaderTab';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

const LoanApplicationScreen = ({ route}) => {

  const navigation = useNavigation();  

const screenHeight =Dimensions.get('window').height;
//const containerHeight = 0.2 * screenHeight;
const {userToken} =useContext(AuthContext);
const {request_amount,plan_applied,loan_type,device_name,device_id} =route.params;
const[totalAmount,setTotalAmount] =useState(0);
const[startDate,setStartDate] =useState(null);
const[endDate,setEndDate] =useState(null);
const[plan,setPlan] =useState(null);
const [guarantor1Status,setGuarantor1Status] =useState(false);
const [guarantor2Status,setGuarantor2Status] =useState(false);
const [guarantor1fs,setGuarantor1fs]=useState(null);
const [guarantor1rs,setGuarantor1rs]=useState(null);
const [guarantor1pn,setGuarantor1pn]=useState(null);
const [guarantor2fs,setGuarantor2fs]=useState(null);
const [guarantor2rs,setGuarantor2rs]=useState(null);
const [guarantor2pn,setGuarantor2pn]=useState(null);
const [value,setValue] =useState(1);
const [agents,setAgents]=useState([]);
const [isLoading,setIsLoading] =useState(false);
const [initialDeposit ,setInitialDeposit] =useState(null);
const getAgents=()=>{

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/get-agents`,
      headers: { 
        'Authorization': `Bearer ${userToken}`, 
      }
    };

    axios.request(config)
    .then((response) => {
      //console.log(response.data);
      setAgents(response.data.data);
    })
    .catch((error) => {
     // console.log(error.response.data);
    });

}

const loanApplication=()=>{

  if (!value) {
    notification("You must choose College Agent");
    return;
  }
  if (!guarantor1fs || !guarantor1rs || !guarantor1pn || !guarantor2fs || !guarantor2rs || !guarantor2pn) {
    notification("Please Complete Fill Guarantor Details");
    return;
  }
  setIsLoading(true);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/loan-application`,
    headers: { 
      'Authorization': `Bearer ${userToken}`, 
    },
    data:{
      'amount':request_amount,
      'plan':plan_applied ?? 1,
      'agent_id':value,
      'guarantor1fs':guarantor1fs,
      'guarantor1rs':guarantor1rs,
      'guarantor1pn':guarantor1pn,
      'guarantor2fs':guarantor2fs,
      'guarantor2rs':guarantor2rs,
      'guarantor2pn':guarantor2pn,
      'loan_type'   :loan_type,
      'device_id'   :device_id ?? null
    }
  };

  axios.request(config)
  .then((response) => {
    setIsLoading(false);
    Toast.show({
      type: 'success',
      text1: response.data.message,
      position: 'top'
    });
    navigation.navigate('HomeScreen');
   // setAgents(response.data.data);
  })
  .catch((error) => {
    setIsLoading(false);
    notification(error.response.data.errors);
  });

}

const datas   =agents.map(item => ({
  label: item.name,
  value: item.id.toString(), // Convert id to string if needed
}));
const loanCalculator=()=>{
  axios.post(`${BASE_URL}/loan-calculator`, {
      amount: request_amount,
      plan:plan_applied,
      loan_type:loan_type,
      device_name:device_name,
      device_id:device_id,
    }, {
      headers: {
      //  'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    }).then(response => {
     // console.log(response.data);
      setTotalAmount(response.data.data.total_amount);
      setStartDate(response.data.data.start_date);
      setEndDate(response.data.data.end_date);
      setPlan(response.data.data.plan);
      setInitialDeposit(response.data.data.initial_deposit);
    }).catch(error => {
      console.log(error.response.data);
    });
}

//  useFocusEffect(()=>{
//   loanCalculator();
//  },[]);

useEffect(() => {
  loanCalculator();
  getAgents();
}, []);

//Call the API every time the screen is focused
useFocusEffect(() => {
  loanCalculator();
  //getAgents();
  return () => {
    // Clean up any subscriptions or resources if needed
  //  console.log('Clean up here...');
  };
});


const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      // justifyContent: 'space-evenly',
    },
    view: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    topView: {
      backgroundColor: '#272F3B',
      justifyContent: 'center',
      alignItems: 'center',
     marginTop: -60,
      height: screenHeight * 0.35,
    },
    amountText:{
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff'
    }, 
    amountSubText:{
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: '#fff'
    },
    middleView:{
      backgroundColor: '#fff',
      borderWidth: 0.3, 
      marginLeft: 10,
      marginRight: 10,
      marginTop: -80,
      padding: 10,
      borderRadius: 10,
      borderColor: "grey",
    },
    guarantorView:{
      backgroundColor: 'rgba(7, 133, 134,0.1)',
      alignItems: 'center',
      height: 60,
      justifyContent: 'center'
    },
    headerMiddleView:{
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    subMiddleView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 3
    },
    leftSubMiddleText:{
        fontSize: 18,
        fontWeight: '500',
        color: "#000"
    },
    guarantorSubView:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    headerGuarantorView:{
        fontSize: 14,
        fontWeight: 'bold',
        color: "#272F3B"
    },
    termsHeader:{
      fontSize: 15,
      fontWeight: 'bold',
      color: "#272F3B"
    },
    bottomNavigationView: {
      backgroundColor: '#fff',
     // width: '100%',
      height: screenHeight * 0.60,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      justifyContent: 'space-between'
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    guarantorHeader:{
      marginTop: 10,
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#272F3B'
    },
    guarantorContainer:{
      borderWidth: 0.2,
      marginLeft: 10,
      marginRight: 10,
      borderColor: "gray",
      marginTop: 10
    },
    centerElement: { justifyContent: 'center', alignItems: 'center' },
  dropdown: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#272F3B',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },

  });
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    if(!guarantor1fs || !guarantor1rs || !guarantor1pn){
      setGuarantor1Status(false);
    }else if(guarantor1fs  && guarantor1rs && guarantor1pn){
      setGuarantor1Status(true);
    }
    setVisible(!visible);
  };

  const [visible2, setVisible2] = useState(false);

  const toggleBottomNavigationView2 = () => {
    //Toggling the visibility state of the bottom sheet
    if(!guarantor2fs || !guarantor2rs || !guarantor2pn){
      setGuarantor2Status(false);
    }else if(guarantor2fs && guarantor2rs && guarantor2pn){
      setGuarantor2Status(true);
    }
    setVisible2(!visible2);
  };

  const notification =(message)=>{
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top'
    });
  };

  const submitGuarantor1 =() =>{
     // alert('clicked');
    if (!guarantor1fs) {
      setGuarantor1Status(false);
      notification("Guarantor Full Name Required");
    }else if(!guarantor1rs){
      setGuarantor1Status(false);
      notification("Guarantor Relationship Required");
    }
    else if (!guarantor1pn){
      setGuarantor1Status(false);
      notification("Guarantor Phone Number Required");
    }
     else {
      setGuarantor1Status(true);
      setVisible(!visible);
    }
  }

  const submitGuarantor2 =() =>{
    if (!guarantor2fs) {
      setGuarantor2Status(false);
      notification("Guarantor Full Name Required");
    }else if(!guarantor2rs){
      setGuarantor2Status(false);
      notification("Guarantor Relationship Required");
    }
    else if (!guarantor2pn){
      setGuarantor2Status(false);
      notification("Guarantor Phone Number Required");
    }
     else {
      setGuarantor2Status(true);
      setVisible2(!visible2);
    }
  }
  return (
    <>
    <HeaderTab title="Loan Application" />
   
    <SafeAreaView style={{ backgroundColor: '#fff' , flex: 1}}>
    <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        <View style={styles.container}>
          <View style={styles.topView}>
            <View>
              <Text style={styles.amountText} >{totalAmount.toLocaleString()} TZS</Text>
              <Text style={styles.amountSubText}>Total Loan Amount</Text>
            </View>
          </View>
          <View style={styles.middleView}>
            <Text style={styles.headerMiddleView}>Loan Details</Text>
            <View style={styles.subMiddleView} >
                <Text style={styles.leftSubMiddleText}>Request Amount</Text>
                <Text>{request_amount.toLocaleString()} TZS</Text>
            </View>
            {
              loan_type == 2 ?
              <View style={styles.subMiddleView} >
              <Text style={styles.leftSubMiddleText}>Initial Deposit</Text>
              <Text>{initialDeposit} TZS</Text>
               </View>: ''
            }
            
            <View style={styles.subMiddleView} >
                <Text style={styles.leftSubMiddleText}>Plan</Text>
                <Text>{plan} month</Text>
            </View>
            <View style={styles.subMiddleView}>
                <Text style={styles.leftSubMiddleText}>Start Date</Text>
                <Text>{startDate}</Text>
            </View>
            <View style={styles.subMiddleView}>
                <Text style={styles.leftSubMiddleText}>Expected End Date</Text>
                <Text>{endDate}</Text>
            </View>
            {
              device_name && loan_type == 2 ? 
                <View style={styles.subMiddleView}>
                  <Text style={styles.leftSubMiddleText}>Device</Text>
                  <Text>{device_name} </Text>
              </View> : ''
            }
            
          </View>
          <Text style={styles.guarantorHeader}>Guarantors</Text>
          <View style={styles.guarantorContainer}>
          <TouchableOpacity activeOpacity={0.9} style={styles.guarantorView} onPress={toggleBottomNavigationView} >
            <View style={styles.guarantorSubView} >
            { guarantor1Status ? (
              <View style={styles.guarantorSubView}>
                <Text onPress={toggleBottomNavigationView} style={styles.headerGuarantorView}> Added</Text>
                <Icon
                  name="check"
                  type="font-awesome"
                  size={25}
                  //reverse
                  color="#198754"
                />
                </View>
            ):(
              <View style={styles.guarantorSubView}>
              <Text onPress={toggleBottomNavigationView} style={styles.headerGuarantorView}> Add Guarantor</Text>
            <Icon
              name="plus-circle"
              type="font-awesome"
              size={20}
              //reverse
              color="#272F3B"
            />
            </View>
            )
            }
          </View>  
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={[styles.guarantorView,{marginTop: 30}]} onPress={toggleBottomNavigationView2} >
            <View style={styles.guarantorSubView} >
            { guarantor2Status ? (
              <View style={styles.guarantorSubView}>
                <Text onPress={toggleBottomNavigationView2} style={styles.headerGuarantorView}> Added</Text>
                <Icon
                  name="check"
                  type="font-awesome"
                  size={25}
                  //reverse
                  color="#198754"
                />
                </View>
            ):(
              <View style={styles.guarantorSubView}>
              <Text onPress={toggleBottomNavigationView2} style={styles.headerGuarantorView}> Add Guarantor</Text>
            <Icon
              name="plus-circle"
              type="font-awesome"
              size={20}
              //reverse
              color="#272F3B"
            />
            </View>
            )
            }
          </View>  
          </TouchableOpacity>
      
          </View>
        
          <View style={{ margin: 10}}>
          <Text style={styles.guarantorHeader}>College Agent</Text>
           <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={datas}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select College Agent"
                searchPlaceholder="Search..."
                value={value}
                autoScroll={true}
                showsVerticalScrollIndicator={true}
                onChange={item => {
                    setValue(item.value);
                }}
                
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
          </View>
          
          {/* <View style={{ margin: 10}}>
            
            <Text style={styles.termsHeader}>By Clicking you accept our terms and condition </Text>
          </View> */}
          <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 15}}>
            <IconButton icon="arrow-circle-right" name="Confirm Loan Application" onPress={loanApplication} />
          </View>
        </View>
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View style={{ margin: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: "#272F3B"
                }}> 
                Loan Guarantor
              </Text>
              <View >
                <FormInput placeholder={guarantor1fs ?? "Guarantor Fullname"} label="Full name" value={guarantor1fs} onChangeText={text =>setGuarantor1fs(text)} />
                <FormInput placeholder={guarantor1rs ?? "Guarantor Relationship"} label="Guarantor Relationship" value={guarantor1rs} onChangeText={text =>setGuarantor1rs(text)}  />
                <FormInput placeholder={guarantor1pn ?? "Phone number"} label="Phone number" value={guarantor1pn} onChangeText={text =>setGuarantor1pn(text)}  />
              </View>
              <View style={{ marginTop: 20, padding: 0}}>
              <IconButton icon="arrow-circle-right" name="Submit Guarantor Details" onPress={submitGuarantor1} />
              </View>
            </View>
          </View>
        </BottomSheet>
        <BottomSheet
          visible={visible2}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView2}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView2}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View style={{ margin: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: "#272F3B"
                }}> 
                Loan Guarantor 2
              </Text>
              <View >
                <FormInput placeholder={guarantor2fs ?? "Guarantor Fullname"} label="Full name"  value={guarantor2fs} onChangeText={text =>setGuarantor2fs(text)}/>
                <FormInput placeholder={guarantor2rs ?? "Guarantor Relationship"} label="Guarantor Relationship"  value={guarantor2rs} onChangeText={text =>setGuarantor2rs(text)}/>
                <FormInput placeholder={guarantor2pn ?? "Phone number"} label="Phone number" value={guarantor2pn} onChangeText={text =>setGuarantor2pn(text)}/>
              </View>
              <View style={{ marginTop: 20, padding: 0}}>
              <IconButton icon="arrow-circle-right" name="Submit Guarantor Details" onPress={submitGuarantor2} />
              </View>
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
     
      </SafeAreaView>
      <Footer />
      </>
  )
}

export default LoanApplicationScreen


