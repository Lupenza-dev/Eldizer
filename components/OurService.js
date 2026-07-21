import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BottomSheet } from 'react-native-btr'
import IconButton from './IconButton'
import LoanAppSlider from './LoanAppSlider'
import { useLanguage } from '../utils/LanguageContext'
import { AuthContext } from '../context/AuthContext'

const screenHeight =Dimensions.get('window').height;

const OurService = () => {
    const navigation =useNavigation();
    const {customer} =useContext(AuthContext);
    const {t} =useLanguage();

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const toggleBottomNavigationView = () => {
        setVisible(!visible); 
    };
    const toggleBottomNavigationView2 = () => {
        setVisible2(!visible2); 
    };

    const closeBottomSheetAndNavigate = (value) => {
        setVisible(false);
        navigation.navigate('LoanApplicationScreen', {
            request_amount: value,
            plan_applied: 1,
            loan_type: 1,
            device_name: null,
            device_id: null
        });
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.serviceContainer}
        activeOpacity={0.7}
        onPress={toggleBottomNavigationView}
      >
        <View style={[styles.iconView, { backgroundColor: '#ecfdf5' }]}>
          <Image source={require('../assets/money.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>{t('money_loan')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DeviceScreen', { device_category: 1 })}
      >
        <View style={[styles.iconView, { backgroundColor: '#eff6ff' }]}>
          <Image source={require('../assets/phone.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>{t('phone_loan')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DeviceScreen', { device_category: 2 })}
      >
        <View style={[styles.iconView, { backgroundColor: '#fef3c7' }]}>
          <Image source={require('../assets/laptop.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>{t('laptop_loan')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceContainer}
        activeOpacity={0.7}
        onPress={toggleBottomNavigationView2}
      >
        <View style={[styles.iconView, { backgroundColor: '#fce7f3' }]}>
          <Image source={require('../assets/box.png')} style={styles.imageStyle} />
        </View>
        <Text style={styles.serviceText}>{t('pedi')}</Text>
      </TouchableOpacity>

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>{t('money_loan')}</Text>
            <View style={styles.sheetDivider} />
            <LoanAppSlider onApply={closeBottomSheetAndNavigate} />
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        visible={visible2}
        onBackButtonPress={toggleBottomNavigationView2}
        onBackdropPress={toggleBottomNavigationView2}
      >
        <View style={styles.bottomNavigationView2}>
          <View style={styles.sheetHandle} />
          <View style={styles.comingSoonContent}>
            <View style={styles.warningIconWrapper}>
              <Image source={require('../assets/warning.png')} style={styles.warninImageStyle} />
            </View>
            <Text style={styles.comingSoonTitle}>{t('coming_soon')}</Text>
          </View>
          <View style={{ marginHorizontal: 16, marginTop: 16 }}>
            <IconButton icon="arrow-circle-right" name={t('close')} onPress={toggleBottomNavigationView2} />
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

export default OurService

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        gap: 10,
    },
    iconView:{
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    serviceContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    serviceText:{
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 12,
        color: '#111827',
        letterSpacing: 0.2,
    },
    imageStyle:{
        height: 36,
        width: 36,
        resizeMode: 'contain',
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        height: screenHeight * 0.40,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    sheetHandle: {
        width: 44,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#e5e7eb',
        alignSelf: 'center',
        marginTop: 10,
    },
    sheetContent: {
        margin: 16,
    },
    sheetTitle: {
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    sheetDivider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginVertical: 8,
    },
    warningIconWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#fef3c7',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    warninImageStyle:{
        height: 56,
        width: 56,
        resizeMode: 'contain',
    },
    comingSoonContent: {
        alignItems: 'center',
        marginTop: 16,
    },
    comingSoonTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginTop: 14,
    },
    bottomNavigationView2: {
        backgroundColor: '#fff',
        height: screenHeight * 0.32,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
})