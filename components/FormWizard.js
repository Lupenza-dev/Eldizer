
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import FormInput from './FormInput';
import ImageUpload from './ImageUpload';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import DropDownSelect from './DropDownSelect';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import SweetAlert from './SweetAlert';
import Toast from 'react-native-toast-message'
import HeaderTab from './HeaderTab'; 
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from './PhoneInput';
import pushNotification from '../pushNotification';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';

const FormWizard = () => {
  const {userToken,completeRegistration} =useContext(AuthContext);

  const [expoPushToken] = pushNotification();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Address Info', 'College Info', 'Other Info'];
  const navigation = useNavigation();
  const [regions, setRegions] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [regionId, setRegionId] = useState(null);
  const [value, setValue] = useState(null);
  const [districtValue, setDistrictValue] = useState(null);
  const [wardValue, setWardValue] = useState(null);
  const [collegeValue, setCollegeValue] = useState(null);
  const [yearValue, setYearValue] = useState(null);
  const [heslbValue, setHeslbValue] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [middlename, setMiddlename] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [othername, setOtherName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [idnumber, setIdnumber] = useState(null);
  const [street, setStreet] = useState(null);
  const [residence, setResidence] = useState(null);
  const [registrationid, setRegistrationid] = useState(null);
  const [indexno, setIndexno] = useState(null);
  const [course, setCourse] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [collegeId, setCollegeId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({});
  const [nida,setNida] =useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setResidence(currentDate);
  };

  const getRegion = () => {
    axios.get(`${BASE_URL}/get-regions`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      //console.log(response);
      setRegions(response.data.data);
    }).catch(error => {
     // console.log(error);
      console.log(error.response);
    });
  }

  const getColleges = () => {
    axios.get(`${BASE_URL}/get-colleges`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
     // console.log(response);
      setColleges(response.data.data);
    }).catch(error => {
      //console.log(error);
     // console.log(error.response.data);
    });
  }

  useEffect(() => {
    getRegion();
    getColleges();
   
  }, [expoPushToken]);

  const handleNextStep = () => {
    if (currentStep + 1 < steps.length) {
      if (currentStep === 0) {
        if (!idnumber) {
          notification("NIDA Number field required !!! 😡😡😡");
        }
        if (!regionId) {
          notification("Region field required !!! 😡😡😡");
        } else if (!districtId) {
          notification("District field required !!! 😡😡😡");
        } else if (!wardId) {
          notification("Ward field required !!! 😡😡😡");
        } else if (!street) {
          notification("Street field required !!! 😡😡😡");}
        else {
          setCurrentStep(currentStep + 1);
        }
      } else if (currentStep === 1) {
        if (!collegeValue) {
          notification("College Name field required !!! 😡😡😡");
        } else if (!registrationid) {
          notification("Registration Field field required !!! 😡😡😡");
        } else if (!course) {
          notification("Course Field field required !!! 😡😡😡");
        } else if (!yearValue) {
          notification("Course Year Field field required !!! 😡😡😡");
        } else if (!heslbValue) {
          notification("Heslb Status field required !!! 😡😡😡");
        }else if(!indexno){
          notification("Form Four Index No field required !!! 😡");
        }
         else {
          setCurrentStep(currentStep + 1);
        }
      } else if (currentStep === 2) {
        if (!image) {
          notification("Image field required !!! 😡😡😡");
        } 
         else {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const notification = (message) => {
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

  const handleRegion = (region_id) => {
    axios.get(`${BASE_URL}/get-districts/${region_id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setDistricts(response.data.data);
    }).catch(error => {
      console.log(error.response.data);
    });
  };

  const handleDistrict = (district_id) => {
    axios.get(`${BASE_URL}/get-wards/${district_id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setWards(response.data.data);
    }).catch(error => {
      console.log(error.response.data);
    });
  };

  const datas = regions.map(item => ({
    label: item.name,
    value: item.id.toString(),
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

  const districtData = districts.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const wardData = wards.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const collegeData = colleges.map(item => ({
    label: item.name,
    value: item.id.toString(),
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
    if (!image) {
      notification("Image field required !!! 😡😡😡"); 
    } else {
      
    setIsLoading(true);
    var new_date = formatDateString(residence);
    const formData = new FormData();
    formData.append('id_number', idnumber);
    formData.append('region_id', regionId);
    formData.append('district_id', districtId);
    formData.append('ward_id', wardId);
    formData.append('street', street);
    // formData.append('resident_since', new_date);
    formData.append('college_id', collegeId);
    formData.append('student_reg_id', registrationid);
    formData.append('course', course);
    formData.append('study_year', yearValue);
    formData.append('heslb_status', heslbValue);
    formData.append('index_no', indexno);
    formData.append('expo_push_token', expoPushToken ?? null);
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
      const response = await axios.post(`${BASE_URL}/complete-registration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`, 
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      });
      console.log(response.data);
      setIsLoading(false);
      completeRegistration();
      Toast.show({
        type: 'success',
        text1: response.data.message ?? null,
        position: 'top',
      });
      navigation.navigate('HomeScreen');
    } catch (error) {
      setIsLoading(false);
      errorFunction(error.response.data.errors ?? []);
      console.log(error.response);
    }
  }
  };


  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.stepsContainer}>
            {steps.map((label, i) => (
              <View key={i} style={styles.step}>
                {i > currentStep && i !== currentStep && /* Not selected */
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepText}>{i + 1}</Text>
                  </View>
                }
                {i < currentStep && /* Checked */
                  <View style={styles.stepNumberChecked}>
                    <Ionicons name="checkmark" size={25} color="#fff" />
                    {/* <Icon name='antdesign' type='check' size={20} color="#fff"/> */}
                  </View>
                }
                {i === currentStep && /* Selected */
                  <View style={styles.stepNumberSelected}>
                    <Text style={styles.stepTextSelected}>{i + 1}</Text>
                  </View>
                }
                <Text style={styles.stepLabel}>{label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.formContainer}>
            {currentStep === 0 &&
              <View>
                <FormInput placeholder="ID number (NIDA Number)" label="NIDA number" 
                 value={idnumber}
                 iconType="font-awesome"
                 iconName ="id-card-o"
                 inputlength ={20}
                  onChangeText={text=>setIdnumber(text)}/>
                {/* Add other FormInput components here */}
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
              <FormInput placeholder="Street" label="Street"
               value={street} 
               iconType="font-awesome"
               iconName ="map-marker"
               height={100}
               onChangeText={text=>setStreet(text)} />
              </View>
            }
          {currentStep === 1 &&
            <View>
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
              <FormInput placeholder="Form Four  Index No" label="Form Four Index No (S.0000.0000.2016)"
               value={indexno} 
               iconType="font-awesome"
               iconName ="id-card-o"
               onChangeText={text=>setIndexno(text)} />
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
           {currentStep === 2 &&
            <View>
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
              />
              <ImageUpload onImageChange={handleImageChange} />
            </View>
          }
            {/* Add other steps/forms here */}
          </View>
          <View style={styles.buttonsContainer}>
            {currentStep > 0 &&
              <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            }
            {currentStep + 1 < steps.length &&
              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            }
            {currentStep + 1 === steps.length &&
              <TouchableOpacity style={styles.button} onPress={submitForm}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    gap: 20
  },
  step: {
    alignItems: 'center',
    width: '25%',
  },
  stepNumber: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#D54536',
    borderRadius: 15,
    marginBottom: 10,
  },
  stepNumberChecked: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#0faf9a',
    borderWidth: 2,
    borderColor: '#0faf9a',
    borderRadius: 15,
    marginBottom: 10,
  },
  stepNumberSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#D54536',
    borderWidth: 2,
    borderColor: '#D54536',
    borderRadius: 15,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 15,
    color: '#D54536',
  },
  stepTextSelected: {
    fontSize: 13,
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
   // flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D54536',
    borderRadius: 20,
    marginHorizontal: 5,
    width: 70
  },
  buttonText: {
    color: '#fff',
  },
  dropdown: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#272F3B',
    borderRadius: 10,
    padding: 10,
    marginTop: 5
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  }
});

export default FormWizard;
