import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TangazoCard from './TangazoCard'
import GroupCard from './GroupCard'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const Advert = ({ adData , groupData}) => {
    const [category,setCategory] =useState(1);
    
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>setCategory(1)}>
        <View style={[styles.buttonView,category == 1 ? styles.activeTab: '']}>
            <Image source={ require('../assets/speaker.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>Matangazo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setCategory(2)}>
      <View style={[styles.buttonView,category == 2 ? styles.activeTab: '']}>
            <Image source={ require('../assets/community.png')} style={styles.imageStyle} />
            <Text style={styles.buttonText}>Groups</Text>
        </View>
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
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    imageStyle:{
        height: 30,
        width: 30
    },
    buttonView:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 17
    },
    activeTab:{
        backgroundColor: 'rgba(7, 133, 134,0.1)',
    }
})