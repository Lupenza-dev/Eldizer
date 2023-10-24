import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import PhoneInput from '../PhoneInput'
import MediumText from '../MediumText'

const Step1 = ({onchangestep1}) => {
  const [firstname ,setFirstname] =useState(null);
  const [middlename ,setMiddlename] =useState(null);
  const [lastname ,setLastname] =useState(null);
  const [othername ,setOtherName] =useState(null);
  const [phone ,setPhone] =useState(null);
  const [email ,setEmail] =useState(null);
  const [idnumber ,setIdnumber] =useState(null);

  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    othername: '',
    phone: '',
    email: '',
    idnumber: '',
  });

  useEffect(() => {
    if (isFormComplete()) {
      onchangestep1(formData);
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
  };

  const isFormComplete = () => {
    const { firstname, middlename, lastname, othername, phone, email, idnumber } = formData;
    return (
      firstname.trim() !== '' &&
      middlename.trim() !== '' &&
      lastname.trim()   !== '' &&
      othername.trim()  !== '' &&
      phone.trim()      !== '' &&
      email.trim()      !== '' &&
      idnumber.trim()   !== ''
    );
  };

  return (
    <View style={{ marginBottom: 20}}> 
        <MediumText style={styles.textLabel}  text="Personal Informations"/>
        <FormInput placeholder="First name" label="First name" 
         value={formData.firstname}
        iconType="font-awesome"
        iconName ="user-o"
        // onChangeText={(text) =>
        //    handleInputChange('firstname', text),
        //    setFirstname(text)
        //   }

          onChangeText={(text) => {
           // setFirstname(formData.firstname);
            handleInputChange('firstname',text);
          }}
        />
        <FormInput placeholder="Middle name" label="Middle name"
          value={formData.middlename}
          iconType="font-awesome"
          iconName ="user-o"
          onChangeText={(text) => handleInputChange('middlename', text)}
          />
        <FormInput placeholder="Last name" label="Last name"
          iconType="font-awesome"
          iconName ="user-o"
          value={formData.lastname}
          onChangeText={(text) => handleInputChange('lastname', text)}
        />
        <FormInput placeholder="Other name" label="Other name" 
            iconType="font-awesome"
            iconName ="user-o"
            value={formData.othername} 
           onChangeText={(text) => handleInputChange('othername', text)}

        />
        <PhoneInput 
        placeholder="673******" 
        label="Phone number" 
          value={formData.phone} 
          onChangeText={(text) => handleInputChange('phone', text)}

          />
        <FormInput placeholder="Email" label="Email" 
          value={formData.email}
          iconType="font-awesome"
          iconName ="envelope-o"
          onChangeText={(text) => handleInputChange('email', text)}

           />
        <FormInput placeholder="ID number" label="ID number" 
          value={formData.idnumber}
          iconType="font-awesome"
          iconName ="id-card-o"
          onChangeText={text=>handleInputChange('idnumber',text)}/>
    </View>
  )
}

export default Step1

const styles = StyleSheet.create({
  textLabel:{
    fontSize: 22,
    textAlign: 'center',
    color: '#078586',
    textDecorationLine: 'underline'
  }
})