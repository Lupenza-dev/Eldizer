import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import MediumText from '../MediumText'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const Step3 = () => {
    const[colleges,setColleges] =useState([]);
    const [collegeValue, setCollegeValue] = useState(null);
    const [yearValue, setYearValue] = useState(null);
    const [heslbValue, setHeslbValue] = useState(null);
    const [registrationid ,setRegistrationid] =useState(null);
    const [course,setCourse] =useState(null);
    const [collegeId,setCollegeId] =useState(null);


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

      useEffect(() => {
        getColleges();
        },[]);
    
  return (
    <View>
        <MediumText style={styles.textLabel}  text="College Informations"/>
        {/* <FormInput placeholder="Region" label="Region" /> */}
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

        
    </View>
  )
}

export default Step3

const styles = StyleSheet.create({
  textLabel:{
    fontSize: 22,
    textAlign: 'center',
    color: '#272F3B',
    textDecorationLine: 'underline'
  },
  textlabe2:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: "#272F3B"
},




centerElement: { justifyContent: 'center', alignItems: 'center' },
dropdown: {
  height: 60,
  width: '100%',
  borderWidth: 1,
  borderColor: '#272F3B',
  borderRadius: 10,
  padding: 10,
  marginTop: 5
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
  color: "#272F3B"
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
})