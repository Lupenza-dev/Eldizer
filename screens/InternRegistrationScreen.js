import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTab from '../components/HeaderTab'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import Toast from 'react-native-toast-message'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import Icon from '../components/Icon';
import * as DocumentPicker from 'expo-document-picker'

const InternRegistrationScreen = () => {
  const navigation = useNavigation();
  const { userToken, completeRegistration } = useContext(AuthContext);

  const [hospitals, setHospitals] = useState([]);
  const [hospitalValue, setHospitalValue] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [nidaNumber, setNidaNumber] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(Platform.OS === 'ios');
  const [showEndDate, setShowEndDate] = useState(Platform.OS === 'ios');

  const getHospitals = () => {
    axios.get(`${BASE_URL}/get-hospitals`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }
    }).then(response => {
      // console.log(response.data);
      setHospitals(response.data.data);
    }).catch(error => {
      console.log(error.response);
    });
  };

  useEffect(() => {
    getHospitals();
  }, []);

  const hospitalData = hospitals.map(item => ({
    label: item.name + (' (' + item.short_name + ')'),
    value: item.id.toString(),
  }));

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onStartDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowStartDate(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowEndDate(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPdfFile(result.assets[0]);
      }
    } catch (error) {
      console.log('Document picker error:', error);
    }
  };

  const notification = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'bottom',
    });
  };

  const errorFunction = (errors) => {
    Object.keys(errors).forEach((key) => {
      errors[key].forEach((message) => {
        notification(message);
      });
    });
  };

  const submitForm = async () => {
    if (!hospitalId) {
      notification("Hospital field is required!");
      return;
    }
    if (!professional) {
      notification("Professional field is required!");
      return;
    }
    if (!nidaNumber) {
      notification("NIDA Number field is required!");
      return;
    }
    if (!pdfFile) {
      notification("Please upload a PDF document!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('hospital_id', hospitalId);
    formData.append('professional', professional);
    formData.append('nida_number', nidaNumber);
    formData.append('start_date', formatDateString(startDate));
    formData.append('end_date', formatDateString(endDate));

    if (pdfFile) {
      formData.append('letter', {
        uri: pdfFile.uri,
        type: pdfFile.mimeType || 'application/pdf',
        name: pdfFile.name || 'document.pdf',
      });
    }

    try {
      const response = await axios.post(`${BASE_URL}/complete-intern-registration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
      console.log(response.data);
      setIsLoading(false);
      completeRegistration();
      Toast.show({
        type: 'success',
        text1: response.data.message ?? 'Registration completed successfully!',
        position: 'top',
      });
      navigation.navigate('HomeScreen');
    } catch (error) {
      setIsLoading(false);
      errorFunction(error.response?.data?.errors ?? []);
      console.log(error.response);
    }
  };

  return (
    <>
    <HeaderTab title="Complete Registration" />
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Spinner visible={isLoading} textContent={'Submitting...'} textStyle={{ color: '#FFF' }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>

          <View style={{ paddingTop: 10 }}>
            <Text style={styles.textlabel}>Hospital</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={hospitalData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Hospital"
              searchPlaceholder="Search..."
              value={hospitalValue}
              onChange={item => {
                setHospitalValue(item.value);
                setHospitalId(item.value);
              }}
              renderRightIcon={() => (
                <AntDesign style={styles.icon} color="black" name="down" size={12} />
              )}
            />
          </View>

          <FormInput
            placeholder="e.g. Nurse, Doctor, Lab Tech"
            label="Professional"
            value={professional}
            iconType="font-awesome"
            iconName="stethoscope"
            onChangeText={text => setProfessional(text)}
          />

          <Text style={[styles.textlabel, { paddingTop: 10 }]}>Internship Start Date</Text>
          <View style={styles.dateInput}>
            {Platform.OS === 'android' && (
              <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDate(true)}>
                <Icon name="calendar" type="antdesign" size={18} color="#272F3B" />
                <Text style={styles.dateText}>{formatDateString(startDate)}</Text>
              </TouchableOpacity>
            )}
            {showStartDate && (
              <DateTimePicker
                testID="startDatePicker"
                value={startDate}
                mode="date"
                is24Hour={true}
                onChange={onStartDateChange}
              />
            )}
          </View>

          <Text style={[styles.textlabel, { paddingTop: 10 }]}>Internship End Date</Text>
          <View style={styles.dateInput}>
            {Platform.OS === 'android' && (
              <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDate(true)}>
                <Icon name="calendar" type="antdesign" size={18} color="#272F3B" />
                <Text style={styles.dateText}>{formatDateString(endDate)}</Text>
              </TouchableOpacity>
            )}
            {showEndDate && (
              <DateTimePicker
                testID="endDatePicker"
                value={endDate}
                mode="date"
                is24Hour={true}
                minimumDate={startDate}
                onChange={onEndDateChange}
              />
            )}
          </View>

          <FormInput
            placeholder="Enter NIDA Number"
            label="NIDA Number"
            value={nidaNumber}
            iconType="font-awesome"
            iconName="id-card-o"
            inputlength={20}
            onChangeText={text => setNidaNumber(text)}
          />

          <Text style={[styles.textlabel, { paddingTop: 10 }]}>Upload Document (PDF)</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.uploadContainer} onPress={pickDocument}>
            <Icon name="clouduploado" type="antdesign" size={32} color="#272F3B" />
            {pdfFile ? (
              <View style={styles.fileInfo}>
                <Icon name="pdffile1" type="antdesign" size={20} color="#D54536" />
                <Text style={styles.fileName} numberOfLines={1}>{pdfFile.name}</Text>
              </View>
            ) : (
              <Text style={styles.uploadText}>Tap to select a PDF file</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={submitForm}>
            <Text style={styles.submitButtonText}>Submit Registration</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
    </>
  )
}

export default InternRegistrationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  textlabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#272F3B',
  },
  dropdown: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#272F3B',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
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
  },
  dateInput: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#272F3B',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#272F3B',
  },
  uploadContainer: {
    borderWidth: 1.5,
    borderColor: '#272F3B',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#272F3B',
    fontWeight: '500',
    maxWidth: 250,
  },
  submitButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D54536',
    borderRadius: 12,
    marginTop: 25,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})