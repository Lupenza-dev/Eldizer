import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TangazoCard from './TangazoCard'
import GroupCard from './GroupCard'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useLanguage } from '../utils/LanguageContext'

const Advert = ({ adData , groupData}) => {
    const [category,setCategory] =useState(1);
    const { t} =useLanguage();
    
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonView, category == 1 && styles.activeTab]}
        onPress={() => setCategory(1)}
        activeOpacity={0.8}
      >
        <Image source={require('../assets/speaker.png')} style={styles.imageStyle} />
        <Text style={[styles.buttonText, category == 1 ? styles.activeText : styles.inactiveText]}>
          {t('adverts')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonView, category == 2 && styles.activeTab]}
        onPress={() => setCategory(2)}
        activeOpacity={0.8}
      >
        <Image source={require('../assets/community.png')} style={styles.imageStyle} />
        <Text style={[styles.buttonText, category == 2 ? styles.activeText : styles.inactiveText]}>
          {t('groups')}
        </Text>
      </TouchableOpacity>
    </View>
    <View>
        {
            category == 1 &&   <TangazoCard advert={adData}/>
        }
         {
            category == 2 &&   <GroupCard group={groupData}/>
        }
    </View>
    </>
  )
}

export default Advert

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginTop: 12,
        marginHorizontal: 10,
        backgroundColor: '#f1f3f5',
        borderRadius: 14,
        padding: 4,
        gap: 4,
    },
    imageStyle:{
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    buttonView:{
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 11,
    },
    buttonText:{
        fontWeight: '700',
        fontSize: 15,
    },
    activeTab:{
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    activeText:{
        color: '#272F3B',
    },
    inactiveText:{
        color: '#9ca3af',
    }
})