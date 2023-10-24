import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import MediumText from '../MediumText'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageUpload from '../ImageUpload';

const Step4 = () => {
    const [isLoading,setIsLoading] =useState(false);

    const handleImageChange = (selectedImage) => {
        setImage(selectedImage);
        console.log(image);
      };

  return (
    <View>
        <MediumText style={styles.textLabel}  text="Other Informations"/>
        {/* <FormInput placeholder="Region" label="Region" /> */}
        <View>
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
              />
              <ImageUpload onImageChange={handleImageChange} />
        </View>

        
    </View>
  )
}

export default Step4

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