import React, { useState } from 'react'
import { Dimensions, SafeAreaView, Text ,View} from 'react-native'
import FormWizard from '../components/FormWizard'

const RegisterScreen = ( { navigation}) => {
  const [height ,setHeight] =useState(Dimensions.get('window').height);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff'}}>
       <View>
        <FormWizard />
       </View>
    </SafeAreaView>
   
  )
}

export default RegisterScreen