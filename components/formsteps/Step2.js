import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import MediumText from '../MediumText'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const Step2 = () => {
    const[regions,setRegions] =useState([]);
    const[colleges,setColleges] =useState([]);
    const[districts,setDistricts] =useState([]);
    const[wards,setWards] =useState([]);
    const [regionId ,setRegionId] =useState(null);
    const [value, setValue] = useState(null);
    const [districtValue, setDistrictValue] = useState(null);
    const [wardValue, setWardValue] = useState(null);
    const [street ,setStreet] =useState(null);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [districtId, setDistrictId] =useState(null);
    const [residence ,setResidence] =useState(null);
    const [wardId,setWardId]=useState(null);



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
      
      const districtData   =districts.map(item => ({
        label: item.name,
        value: item.id.toString(), // Convert id to string if needed
      }));
    
      const wardData   =wards.map(item => ({
        label: item.name,
        value: item.id.toString(), // Convert id to string if needed
      }));

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

      useEffect(() => {
        getRegion();
        },[]);
    
  return (
    <View>
        <MediumText style={styles.textLabel}  text="Address Informations"/>
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
  )
}

export default Step2

const styles = StyleSheet.create({
  textLabel:{
    fontSize: 22,
    textAlign: 'center',
    color: '#078586',
    textDecorationLine: 'underline'
  },
  textlabe2:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: "#078586"
},




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
})