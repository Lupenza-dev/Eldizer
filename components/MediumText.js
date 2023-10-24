import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

const MediumText = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
    });
    setFontLoaded(true);
  }

  useEffect(() => {
    if (!fontLoaded) {
      loadFonts();
    }
  }, [fontLoaded]);

  const styles = StyleSheet.create({
    text: {
      fontFamily: fontLoaded ? 'roboto-medium' : null, // Use a default font if 'roboto-medium' isn't loaded yet
      ...props.style, // Allow additional styles to be passed in as props
    },
  });

  return (
    <Text style={styles.text}>
      {props.text}
    </Text>
  );
};

export default MediumText;
