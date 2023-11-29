import React, { useRef, useState } from "react";
import { SafeAreaView, Button, View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Wizard from "react-native-wizard";
import Step1 from "./formsteps/Step1";
import Step2 from "./formsteps/Step2";
import IconButton from "./IconButton";
import MediumText from "./MediumText";
import { Icon } from 'react-native-elements';
import Step3 from "./formsteps/Step3";
import Step4 from "./formsteps/Step4";
import Toast from 'react-native-toast-message'



const FormWizard = () => {
  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] =useState([]);
  const [firstname ,setFirstname] =useState(null);
  const [middlename ,setMiddlename] =useState(null);
  const [lastname ,setLastname] =useState(null);
  const [othername ,setOtherName] =useState(null);
  const [phone ,setPhone] =useState(null);
  const [email ,setEmail] =useState(null);
  const [idnumber ,setIdnumber] =useState(null);
  const [data, setData] =useState([]);

  const handleStep1 = (data) => {
    let personal_kyc = data;
    // set all step 1 information
    console.log(personal_kyc);
    setFirstname(personal_kyc?.firstname || '');
    setMiddlename(personal_kyc?.middlename || '');
    setLastname(personal_kyc?.lastname || '');
    setOtherName(personal_kyc?.othername || '');
    setPhone(personal_kyc?.phone || '');
    setEmail(personal_kyc?.email || '');
    setIdnumber(personal_kyc?.idnumber || '');

    console.log('follow');
    console.log(firstname);
    console.log(personal_kyc?.firstname || '');

    if (!firstname) {
      notification("First name field required !!! 😡😡😡");
    }else if(!middlename){
      notification("Middle name field required !!! 😡😡😡");
    }
    else if(!lastname){
      notification("Last name field required !!! 😡😡😡");
    }
    else if(!phone){
      notification("Phone Number field required !!! 😡😡😡");
    }

   // alert('we have to handle');
    console.log('follow');
    console.log(firstname);
    console.log(personal_kyc?.firstname || '');
  };

  const stepList = [
    {
      content: <Step1 onchangestep1={handleStep1} />,
    },
    {
      content:  <Step2 />,
    },
    {
      content:  <Step3 />,
    },
    {
      content:  <Step4 />,
    },
  ];

  const handleNext = () => {
    console.log(currentStep);
    // Handle step 1 before submission
    if (currentStep == 0) {
      
      handleStep1();
    }

    // if (wizard.current) {
    //   wizard.current.next();
    // }

  };

  const handlePrev = () => {
    if (wizard.current) {
      wizard.current.prev();
    }
  };

  const notification =(message)=>{
    Toast.show({
      type: 'error',
      text1: message,
      position: 'bottom'
    });
  };



  const handleCurrentStep = ({ currentStep, isLastStep, isFirstStep }) => {
    setCurrentStep(currentStep);
    setIsLastStep(isLastStep);
    setIsFirstStep(isFirstStep);

    // if (currentStep == 1) {
    //   alert('Step 1');
    // }
   
  };

  const submitForm =()=>{
    alert('submitted');
  }

 

  const handleStep2 = () =>{

  }

  return (
    <SafeAreaView style={{ paddingHorizontal: 10 }}>
       <View style={styles.container}>
      <View >
        <ScrollView>
        <Wizard
            ref={wizard}
            steps={stepList}
            onNext={() => {
              console.log("Next Step Called");
            }}
            onPrev={() => {
              console.log("Previous Step Called");
            }}
            currentStep={handleCurrentStep}
          />
        </ScrollView>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={handlePrev} disabled={isFirstStep} style={styles.buttonContainer}>
        <Icon
              name="leftcircleo"
              type="antdesign"
              size={15}
              color="#fff"
            />
        <MediumText style={styles.textLabel}   title="Prev"  text="Prev"/>
        </TouchableOpacity>
        <TouchableOpacity disabled={isLastStep} title={isLastStep ? "SUbmit" :"Next"} onPress={handleNext} style={styles.buttonContainer}>
        <Icon
              name="rightcircleo"
              type="antdesign"
              size={15}
              color="#fff"
           />
        <MediumText style={styles.textLabel}   text={ currentStep == 3 ? "Save" : "Next"}/>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
   
    
  );
};

const styles =StyleSheet.create({
  container:{ 
    flexDirection:"column",
   // backgroundColor: 'red',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  bottomView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer:{
    backgroundColor: '#272F3B',
    color: 'red',
    height: 40,
    width: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10

    
  },
  textLabel:{
    fontSize: 14,
    color: '#fff'


  }
})
export default FormWizard;
