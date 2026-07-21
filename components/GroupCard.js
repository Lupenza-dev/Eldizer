import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
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
        group.length === 0 && (
          <View style={styles.emptyContainer}>
            <Icon name="team" type="antdesign" size={32} color="#c3c9d1" />
            <Text style={styles.emptyText}>No groups available</Text>
          </View>
        )
    }
    {
        group.map((item,i)=>(
            <TouchableOpacity key={i} style={styles.container} activeOpacity={0.8} onPress={() => handleClick(item.link)}>
            <View style={styles.avatarContainer}>
                <Image source={{
                    uri: item.image
                }} style={styles.imageStyle} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
              <View style={styles.metaRow}>
                <Icon name="calendar" type="antdesign" size={12} color="#9ca3af" />
                <Text style={styles.subTitle}>{item.created_at}</Text>
              </View>
            </View>
            <View style={styles.joinBadge}>
              <Text style={styles.joinText}>Join</Text>
              <Icon name="chevron-right" type="feather" size={14} color="#0faf9a" />
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
    avatarContainer:{
        height: 52,
        width: 52,
        borderRadius: 26,
        backgroundColor: '#f1f3f5',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageStyle:{
        height: 52,
        width: 52,
        borderRadius: 26,
        resizeMode: 'cover',
    },
    contentContainer:{
        flex: 1,
        gap: 4,
    },
    title:{
        fontSize: 15,
        fontWeight: '700',
        color: '#272F3B',
        lineHeight: 20,
    },
    metaRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    subTitle:{
        fontSize: 12,
        fontWeight: '400',
        color: '#9ca3af',
    },
    joinBadge:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'rgba(15, 175, 154, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 14,
    },
    joinText:{
        fontSize: 12,
        fontWeight: '700',
        color: '#0faf9a',
    },
    emptyContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        gap: 8,
    },
    emptyText:{
        fontSize: 14,
        color: '#9ca3af',
        fontWeight: '500',
    },
})