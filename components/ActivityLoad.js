import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ActivityLoad = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
       <ActivityIndicator size="large" />
    </View>
  )
}

export default ActivityLoad

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
})