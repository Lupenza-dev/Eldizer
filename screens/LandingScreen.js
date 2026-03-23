import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const LandingScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const renderSlides = (item, index) => (
    <View key={item.id} style={styles.slideContainer}>
      <View>
        <Text style={styles.textHeader}>{item.header}</Text>
        <Text style={styles.textSub}>{item.subtext}</Text>
      </View>
      <View>
        <Image 
          style={styles.imageStyle} 
          source={item.image} 
          resizeMode="contain"
        />
      </View>
    </View>
  );

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  let carouselHeight = 0.70;
  if (Platform.OS === "ios") {
    carouselHeight = 0.65;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.mainContainer}>
        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ height: height * carouselHeight }}
          >
            {slideList.map((item, index) => renderSlides(item, index))}
          </ScrollView>
          
          {/* Pagination dots */}
          <View style={styles.pagination}>
            {slideList.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === currentIndex ? '#D54536' : '#ccc' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Bottom Section with Button */}
        <View style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <IconButton 
              icon="arrow-circle-right" 
              name="Get Started" 
              onPress={() => navigation.navigate('LoginScreen')} 
            />
          </View>
          
          <View style={styles.footerText}>
            <Text style={styles.footerSubtext}>This App is Owned By</Text>
            <Text style={styles.footerBrand}>El-dizer Financial Service</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  slideContainer: {
    width: width,
    marginHorizontal: 20,
    marginTop: 20,
  },
  textHeader: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#272F3B',
  },
  textSub: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    color: '#D54536',
  },
  imageStyle: {
    width: width - 40,
    height: height * 0.45,
  },
  bottomSection: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  footerText: {
    marginVertical: 5,
    alignItems: 'center',
  },
  footerSubtext: {
    fontWeight: '300',
    fontSize: 11,
  },
  footerBrand: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export { LandingScreen };