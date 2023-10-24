import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import FormInput from './FormInput';
import ImageUpload from './ImageUpload';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import DropDownSelect from './DropDownSelect';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Icon } from 'react-native-elements';
import SweetAlert from './SweetAlert';
import Toast from 'react-native-toast-message'
import HeaderTab from './HeaderTab'; 
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from './PhoneInput';


const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0); /* using index 0 as starting point */
  const steps = ['Personal Info', 'Address Info', 'College Info', 'Other Info'];
 // const height = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [height ,setHeight] =useState(Dimensions.get('window').height);
  const[regions,setRegions] =useState([]);
  const[colleges,setColleges] =useState([]);
  const[districts,setDistricts] =useState([]);
  const[wards,setWards] =useState([]);
  const [regionId ,setRegionId] =useState(null);
  const [value, setValue] = useState(null);
  const [districtValue, setDistrictValue] = useState(null);
  const [wardValue, setWardValue] = useState(null);
  const [collegeValue, setCollegeValue] = useState(null);
  const [yearValue, setYearValue] = useState(null);
  const [heslbValue, setHeslbValue] = useState(null);
  const [firstname ,setFirstname] =useState(null);
  const [middlename ,setMiddlename] =useState(null);
  const [lastname ,setLastname] =useState(null);
  const [othername ,setOtherName] =useState(null);
  const [phone ,setPhone] =useState(null);
  const [email ,setEmail] =useState(null);
  const [idnumber ,setIdnumber] =useState(null);
  const [street ,setStreet] =useState(null);
  const [residence ,setResidence] =useState(null);
  const [registrationid ,setRegistrationid] =useState(null);
  const [course,setCourse] =useState(null);
  const [image, setImage]   =useState(null);
  const [errors, setErrors] =useState(null);
  const [districtId, setDistrictId] =useState(null);
  const [collegeId,setCollegeId] =useState(null);
  const [wardId,setWardId]=useState(null);
  const [isLoading,setIsLoading] =useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setResidence(currentDate);
  };

  const getRegion = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-regions`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRegions(response.data.data); // Assuming setRegions is defined and works correctly
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const getColleges=()=>{
    axios.get(`${BASE_URL}/get-colleges`, {
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        setColleges(response.data.data);
      }).catch(error => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    getRegion();
    getColleges();
    const handleScreenResize = () => {
      const newHeight = Dimensions.get('window').height;
      setHeight(newHeight);
    };

  //  Dimensions.addEventListener('change', handleScreenResize);

    // return () => {
    //   Dimensions.removeEventListener('change', handleScreenResize);
    // };
  }, []);


  const handleNextStep = () => {
    if (currentStep + 1 < steps.length) {
      

      if (currentStep == 0) {
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
          // else if(!email){
          //   notification("Email field required !!! 😡😡😡");
          // }
          // else if(!idnumber){
          //   notification("Nida Number field required !!! 😡😡😡");
          // }
           else {
            setCurrentStep(currentStep + 1);
          }
      }else if(currentStep == 1){
        if (!regionId) {
          notification("Region field required !!! 😡😡😡");
        }else if(!districtId){
          notification("District field required !!! 😡😡😡");
        } 
        else if(!wardId){
          notification("Ward field required !!! 😡😡😡");
        }
        else if(!street){
          notification("Street field required !!! 😡😡😡");
        }
        else if(!residence){
          notification("Residence field required !!! 😡😡😡");
        }
        else {
          setCurrentStep(currentStep + 1);
        }

      } 
      else if(currentStep == 2){
          if (!collegeValue) {
            notification("College Name field required !!! 😡😡😡");
          } else if(!registrationid){
            notification("Registration Field field required !!! 😡😡😡");
          }
          else if(!course){
            notification("Course Field field required !!! 😡😡😡");
          }
          else if(!yearValue){
            notification("Course Year Field field required !!! 😡😡😡");
          }
          else if (!heslbValue){
            notification("Heslb Status field required !!! 😡😡😡");
          }
          else {
            setCurrentStep(currentStep + 1);
          }
      }
      else {
        
      }
      console.log(currentStep);
    }
  };

  const notification =(message)=>{
    Toast.show({
      type: 'error',
      text1: message,
      position: 'bottom'
    });
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegion =(region_id)=>{
    axios.get(`${BASE_URL}/get-districts/${region_id}`, {
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setDistricts(response.data.data);
     // console.log(response.data);
    }).catch(error => {
      console.log(error.response.data);
    });
  }

  const handleDistrict =(district_id)=>{
    axios.get(`${BASE_URL}/get-wards/${district_id}`, {
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setWards(response.data.data);
     // console.log(response.data);
    }).catch(error => {
      console.log(error.response.data);
    });
  }

  //const apiData =props.data.data ?? [];
  const datas   =regions.map(item => ({
    label: item.name,
    value: item.id.toString(), // Convert id to string if needed
  }));

  const errorFunction = (errors) => {
    Object.keys(errors).forEach((key) => {
      errors[key].forEach((message) => {
        notification(message);
      });
    });
  };

  const handleImageChange = (selectedImage) => {
    setImage(selectedImage);
    console.log(image);
  };

  const districtData   =districts.map(item => ({
    label: item.name,
    value: item.id.toString(), // Convert id to string if needed
  }));

  const wardData   =wards.map(item => ({
    label: item.name,
    value: item.id.toString(), // Convert id to string if needed
  }));

  const collegeData   =colleges.map(item => ({
    label: item.name,
    value: item.id.toString(), // Convert id to string if needed
  }));

  const yearData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const heslbData = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '2' },
  ];

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const submitForm = async () => {
    setIsLoading(true);
    var new_date =formatDateString(residence);
   // console.log(new_date);
    const formData = new FormData();
    formData.append('first_name', firstname);
    formData.append('middle_name', middlename);
    formData.append('last_name', lastname);
    formData.append('other_name', othername);
    formData.append('phone_number', phone);
    formData.append('email', email);
    formData.append('id_number', idnumber);
    formData.append('region_id', regionId);
    formData.append('district_id', districtId);
    formData.append('ward_id', wardId);
    formData.append('street', street);
    formData.append('resident_since',new_date);
    formData.append('college_id', collegeId);
    formData.append('student_reg_id', registrationid);
    formData.append('course', course);
    formData.append('study_year', yearValue);
    formData.append('heslb_status', heslbValue);
    
    if (image) {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('image', {
        uri: image,
        type: `image/${fileType}`,
        name: `my-image.${fileType}`,
      });
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/customer-registration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: response.data.message ?? null,
        position: 'top',
      });
      // navigation.navigate('LoginScreen');
    } catch (error) {
      setIsLoading(false);
      errorFunction(error.response.data.errors ?? []);
      console.log(error.response.data);
    }
  };

  // const submitForm =()=>{
  //   axios.post(`${BASE_URL}/customer-registration`, {
  //     first_name:firstname,
  //     middle_name: middlename,
  //     last_name: lastname,
  //     other_name: othername,
  //     phone_number: phone,
  //     email: email,
  //     id_number: idnumber,
  //     region_id: regionId,
  //     district_id: districtId,
  //     ward_id: wardId,
  //     street: street,
  //     resident_since: residence,
  //     college_id:collegeId,
  //     student_reg_id:registrationid,
  //     course:course,
  //     study_year:yearValue,
  //     heslb_status:heslbValue,
  //     image:image,
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(response => {
  //     Toast.show({
  //       type: 'success',
  //       text1: response.data.message ?? null,
  //       position: 'top'
  //     });
  //    // navigation.navigate('LoginScreen');
  //   }).catch(error => {
  //     errorFunction(error.response.data.errors ?? []);
  //     console.log(error.response.data);
  //   });
  // }

  return (
    <>
    {/* <HeaderTab title="Registration"/> */}
    {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}> */}
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', margin: 10, justifyContent: 'space-evenly'}}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 280, height: 100, marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ height: 2, backgroundColor: '#D54536', width: 180, position: 'absolute', top: 13, zIndex: 10 }} />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', position: 'absolute', zIndex: 20 }}>
              {steps.map((label, i) => (
                <View key={i} style={{ alignItems: 'center', width: 70 }}>
                  {i > currentStep && i !== currentStep && /* Not selected */
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, backgroundColor: '#fff', borderWidth: 2, borderColor: '#D54536', borderRadius: 15, marginBottom: 10 }}>
                      <Text style={{ fontSize: 15, color: '#D54536' }}>{i + 1}</Text>
                    </View>
                  }
                  {i < currentStep && /* Checked */
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, backgroundColor: '#0faf9a', borderWidth: 2, borderColor: '#0faf9a', borderRadius: 15, marginBottom: 10 }}>
                      <Ionicons name="md-checkmark" size={20} color="#fff" />
                    </View>
                  }
                  {i === currentStep && /* Selected */
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, backgroundColor: '#D54536', borderWidth: 2, borderColor: '#D54536', borderRadius: 15, marginBottom: 10 }}>
                      <Text style={{ fontSize: 13, color: '#ffffff' }}>{i + 1}</Text>
                    </View>
                  }
                  <Text style={{ fontSize: 12 }}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#fff', marginTop: 120, display: 'flex' }}>
          {currentStep === 0 &&
            <View style={{ height: height * 0.73 }}>
              <ScrollView>
                <FormInput placeholder="First name" label="First name" 
                value={firstname} 
                iconType="font-awesome"
                iconName ="user-o"
                onChangeText={text => {
                  setFirstname(text);
                }}
                />
                <FormInput placeholder="Middle name" label="Middle name"
                 value={middlename} 
                 iconType="font-awesome"
                 iconName ="user-o"
                 onChangeText={text => {
                   setMiddlename(text);
                 }} />
                <FormInput placeholder="Last name" label="Last name"
                value={lastname} 
                iconType="font-awesome"
                iconName ="user-o"
                onChangeText={text => {
                  setLastname(text);
                }} 
                />
                <FormInput placeholder="Other name" label="Other name" 
                   iconType="font-awesome"
                   iconName ="user-o"
                   value={othername} 
                   onChangeText={text => {
                    setOtherName(text);
                  }} 
                />
                <PhoneInput 
                placeholder="673******" 
                label="Phone number" 
                 value={phone} 
                 onChangeText={text => {
                   setPhone(text);
                 }}/>
                <FormInput placeholder="Email" label="Email" 
                value={email}
                iconType="font-awesome"
                iconName ="envelope-o"
                 onChangeText={text =>setEmail(text)} />
                <FormInput placeholder="ID number" label="ID number" 
                 value={idnumber}
                 iconType="font-awesome"
                 iconName ="id-card-o"
                  onChangeText={text=>setIdnumber(text)}/>
              </ScrollView>
            </View>
          }
          {currentStep === 1 &&
            <View style={{ height: height * 0.73 }}>
              {/* <FormInput placeholder="Region" label="Region" /> */}
              <View  style={{ paddingTop: 10}}>
              <Text style={styles.textlabel}>Region</Text>
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
                placeholder="Select Region"
                searchPlaceholder="Search..."
                value={value}
                autoScroll={true}
                showsVerticalScrollIndicator={true}
                onChange={item => {
                    setValue(item.value);
                    setRegionId(item.value);
                  handleRegion(item.value);
                }}
                
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
              </View>
              <View  style={{ paddingTop: 10}}>
              <Text style={styles.textlabel}>District</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={districtData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select District"
                searchPlaceholder="Search..."
                value={districtValue}
                onChange={item => {
                    setDistrictValue(item.value);
                    setDistrictId(item.value);
                  handleDistrict(item.value);
                }}
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
              </View>
              <View  style={{ paddingTop: 10}}>
              <Text style={styles.textlabel}>ward</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={wardData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Ward"
                searchPlaceholder="Search..."
                value={wardValue}
                onChange={item => {
                    setWardValue(item.value);
                    setWardId(item.value);
                }}
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
              </View>
              {/* <FormInput placeholder="District" label="District" />
              <FormInput placeholder="Ward" label="Ward" /> */}
              <FormInput placeholder="Street" label="Street"
               value={street} 
               iconType="font-awesome"
               iconName ="map-marker"
               height={100}
               onChangeText={text=>setStreet(text)} />
              {/* <FormInput placeholder="Residence Since" label="Residence Since ?" value={residence} onChangeText={text=>setResidence(text)} /> */}
              <Text style={[styles.textlabel,{paddingTop: 10}]}>Residence Since ?</Text>
              <View style={styles.dateInput}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                
              />
              </View>
             
            </View>
          }
          {currentStep === 2 &&
            <View style={{ height: height * 0.70 }}>
              <View>
              <View  style={{ paddingTop: 10}}>
              <Text style={styles.textlabel}>College name</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={collegeData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select College"
                searchPlaceholder="Search..."
                value={collegeValue}
                onChange={item => {
                    setCollegeValue(item.value);
                    setCollegeId(item.value);
                }}
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
              </View>

              </View>
              <FormInput placeholder="Registration ID" label="Registration ID"
               value={registrationid} 
               iconType="font-awesome"
               iconName ="id-card-o"
               onChangeText={text=>setRegistrationid(text)} />
              <FormInput placeholder="Course" 
              label="Course" 
              value={course} 
              iconType="font-awesome"
               iconName ="list-alt"
              onChangeText={text=>setCourse(text)} />
              <View  style={{ paddingTop: 10}}>
              <Text style={styles.textlabel}>Course year</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={yearData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Course Year"
                searchPlaceholder="Search..."
                value={yearValue}
                onChange={item => {
                    setYearValue(item.value);
                }}
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
              </View>
              <View  style={{ paddingTop: 10}}>
              <Text style={styles.textlabel}>HESLB status</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={heslbData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Heslb Status"
                searchPlaceholder="Search..."
                value={heslbValue}
                onChange={item => {
                    setHeslbValue(item.value);
                }}
                renderRightIcon={() => (
                     <AntDesign style={styles.icon} color="black" name="down" size={12} />
                )}
              />
              </View>

              {/* <FormInput placeholder="HESLB status" label="HESLB status" /> */}
            </View>
          }
          {currentStep === 3 &&
            <View style={{ height: height * 0.73 }}>
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
              />
              <ImageUpload onImageChange={handleImageChange} />
            </View>
          }
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {currentStep > 0 &&
              <TouchableOpacity style={[styles.centerElement, { bottom: 15, left: 10, width: 80, height: 35, backgroundColor: '#D54536', elevation: 10, borderRadius: 20 }]} onPress={handlePreviousStep}>
                <Text style={{ color: '#fff' }}>Back</Text>
              </TouchableOpacity>
            }
            {currentStep + 1 < steps.length &&
              <TouchableOpacity style={[styles.centerElement, { bottom: 15, right: 10, width: 80, height: 35, backgroundColor: '#D54536', elevation: 10, borderRadius: 20 , marginLeft: 15}]} onPress={handleNextStep}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </TouchableOpacity>
            }
            {currentStep + 1 === steps.length &&
              <TouchableOpacity style={[styles.centerElement, { bottom: 15, right: 10, width: 80, height: 35, backgroundColor: '#D54536', elevation: 10, borderRadius: 20 }]} onPress={() =>submitForm()}>
                <Text style={{ color: '#fff' }}>Finish</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  centerElement: { justifyContent: 'center', alignItems: 'center' },
  dropdown: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#078586',
    borderRadius: 10,
    padding: 10,
    marginTop: 5
  },
  dateInput: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#078586',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
   // justifyContent: 'center'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textlabel:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: "#078586"
},
textAlert:{
   color: 'red',
   marginVertical: 5,
   fontSize: 13
},
topView:{
  backgroundColor:'red',
  height: 20,

}
});

export default FormWizard;
