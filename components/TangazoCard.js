import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
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
      {advert.length === 0 && (
        <View style={styles.emptyContainer}>
          <Icon name="notification" type="antdesign" size={32} color="#c3c9d1" />
          <Text style={styles.emptyText}>No adverts available</Text>
        </View>
      )}
      {advert.map((item, i) => (
        <TouchableOpacity key={i} style={styles.container} activeOpacity={0.8} onPress={() => handleClick(item.file)}>
          <View style={styles.iconContainer}>
            <Image source={require('../assets/download.png')} style={styles.imageStyle} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
            <View style={styles.metaRow}>
              <Icon name="calendar" type="antdesign" size={12} color="#9ca3af" />
              <Text style={styles.subTitle}>{item.create_at}</Text>
            </View>
          </View>
          <Icon name="chevron-right" type="feather" size={20} color="#c3c9d1" />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default TangazoCard

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 14,
    marginVertical: 6,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f1f3f5',
  },
  iconContainer: {
    height: 52,
    width: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(39, 47, 59, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#272F3B',
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9ca3af',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
})
