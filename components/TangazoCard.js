import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/GlobalStyles'
import { Linking } from 'react-native'

const TangazoCard = ({ advert }) => {

    const handleClick = async (link) => {
        const supported = await Linking.canOpenURL(link);
        if (supported) {
          await Linking.openURL(link);
        } else {
          alert(`Don't know how to open this URL: ${link}`);
        }
      };
  return (
    <View>
      {advert.map((item, i) => (
        <TouchableOpacity key={i} style={styles.container} activeOpacity={0.8} onPress={() => handleClick(item.file)}>
          <View>
            <Image source={require('../assets/download.png')} style={styles.imageStyle} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.create_at}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default TangazoCard

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 10, // for Android
    shadowColor: colors.primary, // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.5, // for iOS
    shadowRadius: 2, // for iOS
  },
  imageStyle: {
    height: 50,
    width: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
  }
})
