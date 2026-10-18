import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './Icon';
import { colors } from '../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const WarningCard = () => {
  const navigation = useNavigation();
  const {customer} = useContext(AuthContext);

  // console.log(customer);

  const redirectUser = () => {
    if (customer?.customer_type == 1) {
      navigation.navigate('StudentRegSCreen')
    } else {
      navigation.navigate('InternRegistrationScreen');
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
                <Icon name='warning' type='antdesign' size={24} color={colors.warning}/>
            </View>
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Complete Your Registration</Text>
            <Text style={styles.subtitle}>Please complete registration in order to be able to use our service</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} onPress={redirectUser} >
              <Text style={styles.buttonText}>Complete Registration</Text>
              <Icon name='arrowright' type='antdesign' size={16} color='#fff' />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default WarningCard

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E7',
        borderWidth: 1,
        borderColor: '#F5DFA0',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 16,
        marginTop: 20,
        shadowColor: '#E8B61B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    iconContainer:{
        marginRight: 14,
    },
    iconCircle:{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF0C2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer:{
        flex: 1,
    },
    title:{
        fontSize: 16,
        fontWeight: '700',
        color: '#3D3100',
        marginBottom: 4,
    },
    subtitle:{
        fontSize: 13,
        fontWeight: '400',
        color: '#7A6A2E',
        lineHeight: 18,
        marginBottom: 12,
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.warning,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 6,
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
})