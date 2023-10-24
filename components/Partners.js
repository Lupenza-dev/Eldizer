import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';

const Partners = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer} >
          <Text style={styles.headerText}>Our Reach</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
        <Image style={styles.imageStyle} source={require('../assets/logo_ud.png')} />
        <Image style={styles.imageStyle} source={require('../assets/logo_udom.png')} />
        <Image style={styles.imageStyle} source={require('../assets/st_john.png')} />
      </ScrollView>
    </View>
  );
};

export default Partners;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  // headerText: {
  //   fontSize: 22,
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   color: '#D54536',
  // },
  imageStyle: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    // flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 10,
    gap: 60,
    justifyContent: 'space-between'
  },
  headerText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#078586',
  },
  textContainer:{
    borderLeftWidth: 5,
    paddingLeft: 10,
    borderLeftColor: "#078586",
    marginBottom: 10
  }
});
