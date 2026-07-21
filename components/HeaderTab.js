import { SafeAreaView, StyleSheet, Text, View ,Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const HeaderTab = (props) => {
    const navigation = useNavigation();  
    let margin =0;
    if (Platform.OS === 'android') {
         margin =40;
    }
    
  return (
    <View style={[styles.container]}>
        <SafeAreaView style={[styles.safeContainer,{marginTop: margin}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon
              name="left"
              type="antdesign"
              size={20}
              color="#fff"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText} numberOfLines={1}>{props.title}</Text>
          {props.subtitle && (
            <Text style={styles.subtitleText} numberOfLines={1}>{props.subtitle}</Text>
          )}
        </View>
        {props.rightIcon ? (
          <TouchableOpacity
            onPress={props.onRightPress}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Icon
                name={props.rightIcon}
                type={props.rightIconType ?? 'antdesign'}
                size={20}
                color="#fff"
            />
            {props.badgeCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{props.badgeCount > 99 ? '99+' : props.badgeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.rightSpacer} />
        )}
        </SafeAreaView>
        <View style={styles.accentBar} />
    </View>
  )
}

export default HeaderTab

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#272F3B",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        paddingHorizontal: 16,
    },
    titleContainer:{
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    headerText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: '700',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    subtitleText:{
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.65)',
        marginTop: 2,
        textAlign: 'center',
    },
    badgeContainer:{
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -2,
        top: -2,
        borderWidth: 1.5,
        borderColor: '#272F3B',
        paddingHorizontal: 3,
    },
    badgeText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
    },
    accentBar:{
        height: 3,
        width: 48,
        borderRadius: 2,
        backgroundColor: '#D54536',
        alignSelf: 'center',
        marginBottom: 8,
    },
    backButton:{
        height: 42,
        width: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightSpacer:{
        width: 42,
    },
    subTextContainer:{
        height: 20,
        width: 20,
        borderRadius: '50%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 15,
        top: -6
    },
    safeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
    }
})