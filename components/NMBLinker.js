import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../utils/LanguageContext';

const NMBLinker = () => {
    const navigation = useNavigation();
    const {t} =useLanguage();

  return (
    <View style={styles.nmbContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.nmbText}>{t("link_chuo")}</Text>
        </View>
        <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.buttonStyle} 
            onPress={()=>navigation.navigate('NmbScreen')} 
        >
            <Text style={styles.buttonText}>{t('press_here')}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NMBLinker

const styles = StyleSheet.create({
    nmbContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    nmbText: {
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: '#272F3B',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        minWidth: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
    },
})