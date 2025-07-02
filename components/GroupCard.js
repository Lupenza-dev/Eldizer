import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/GlobalStyles'

const GroupCard = ({group}) => {
    const handleClick = async (link) => {
        const supported = await Linking.canOpenURL(link);
        if (supported) {
          await Linking.openURL(link);
        } else {
          alert(`Don't know how to open this URL: ${link}`);
        }
      };
  return (
    <>
    {
        group.map((item,i)=>(
            <TouchableOpacity key={i} style={styles.container} activeOpacity={0.8} onPress={() => handleClick(item.link)}>
            <View>
                <Image source={{
                    uri: item.image
                }} style={styles.imageStyle} />
            </View>
            <View style={{ flex: 1 , gap: 2}}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.created_at}</Text>
            </View>
        </TouchableOpacity>
        ))
    }
    </>
   
  )
}

export default GroupCard

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        elevation: 10, // for Android
        shadowColor: colors.primary, // for iOS
        shadowOffset: { width: 0, height: 2 }, // for iOS
        shadowOpacity: 0.5, // for iOS
        shadowRadius: 2, // for iOS
    },
    imageStyle:{
        height: 50,
        width: 50
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    subTitle:{
        fontSize: 12,
        fontWeight: '400',
    }
})