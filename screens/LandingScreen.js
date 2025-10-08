import React, { useRef } from 'react';
import { s, Image, StyleSheet, Text, TouchableOpacity, View,SafeAreaView, Dimensions, StatusBar, Platform } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import IconButton from '../components/IconButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const slideList = [
  {
    id: 1,
    header: 'Finding the Perfect Emergency Loan For University Student',
    subtext: 'We provide Emergency Loan to university students to pursue their life at University',
    image: require('../assets/students.png'),
  },
  {
    id: 2,
    header: 'Learning Gadget Financing For University Student',
    subtext: 'We Provide learning devices to university students and allow them to pay by installment',
    image: require('../assets/gadgets.png'),
  },
  {
    id: 3,
    header: 'We Got You Covered Even If You Graduated',
    subtext: 'We provide loans to graduate students to employ themselves through their credit score since university',
    image: require('../assets/graduate.png'),
  }
];

const LandingScreen = ( { navigation}) => {
  const carouselRef = useRef(null);
  const renderSlides = ({ item }) => (
    <View style={styles.container}>
      <View>
        <Text style={styles.textHeader}>{item.header}</Text>
        <Text style={styles.textSub}>{item.subtext}</Text>
      </View>
      <View>
        <Image style={{ width: width , height: height*0.65}} source={item.image} />
      </View>
     
    </View>
  );

   let MaxHeight =0.92;
   if (Platform.OS == "ios") {
    MaxHeight =0.87;
   }
  return (
    <>
    {/* <SafeAreaView> */}
      <View style={styles.Maincontainer}>
      <View style={{ backgroundColor: 'white', paddingTop: 10 }}>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={height*MaxHeight}
        autoPlay={true}
        data={slideList}
        scrollAnimationDuration={3000}
        renderItem={renderSlides}
      />
       {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity> */}
      <View style={{ paddingLeft: 10, paddingRight: 10,}}>
            <IconButton icon="arrow-circle-right" name="Get Started" onPress={() => navigation.navigate('LoginScreen')} />
      </View>
      <View style={{ marginVertical:5, alignItems: 'center' }}>
        <Text style={{ fontWeight: '300', fontSize: 11}}>This App is Owned By</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 12}}>El-dizer Financial Service</Text>
      </View>
      </View>
       </View>
   
   
    {/* </SafeAreaView> */}
   
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
  },
  textHeader: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#272F3B'
  },
  textSub: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    color: '#D54536'
  },
  imageStyle: {
    width: '100%',
    height: 500,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#272F3B',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  Maincontainer:{
    flex: 1,
    backgroundColor: '#fff'
   // display: 'flex',
   // flexDirection: 'column', // Default direction is column, so this can be omitted
  // justifyContent: 'space-between', // Align components vertically with space in between
   // alignItems: 'stretch', // Stretch components to fill the full width
  // alignItems: 'center',
  // alignContent: 'center'
  }
});

export {LandingScreen};
