import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
    const {height} =Dimensions.get('window');
    const navigation = useNavigation();

  return (
   <SafeAreaView>
    <View style={styles.container}>
        <View style={{ height: height*0.6}}>
            <Image source={require('../assets/registration.jpg')} style={styles.imageStyle} resizeMode='cover' />
        </View>
        <View style={{ height: height*0.4, backgroundColor: '#fff'}}>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>navigation.navigate('SignUpScreen',{reg_type: 1})}>
        <Text style={styles.buttonText}>University Student</Text>
         </TouchableOpacity>
         {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SignUpScreen',{reg_type: 2})}>
        <Text style={styles.buttonText}>Medical Intern</Text>
         </TouchableOpacity> */}
         <View style={{ marginVertical:5, alignItems: 'center' }}>
            <Text style={{ fontWeight: '300', fontSize: 11}}>This App is Owned By</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 12}}>Eldizer Financial Service</Text>
        </View>
        </View>
        
    </View>
   </SafeAreaView>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container:{
       paddingHorizontal: 10,
       flex: 1
    //    backgroundColor: '#red'
    },
    imageStyle:{
        width: '100%',
        height: '100%',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#272F3B',
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 15
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
})