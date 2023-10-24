import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';


const ImageUpload = ({onImageChange}) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
     // setImage(result.[])
      //console.log(result.uri);
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        onImageChange(result.assets[0].uri)
       // onImageChange(result)
      }
    //  console.log(image);
    };

  return (
    <View style={{ margin: 10}}>
      <Text style={styles.headerText}>Upload Image</Text>
      <View style={styles.imageContainer} >
        <View >
          {
            image ? <Image source={{ uri: image }} style={styles.imageStyle} /> :
         
            <Image style={styles.imageStyle} source={require('../assets/user.jpeg')} />
          }
        </View>
        <View style={{ paddingRight: 20}}>
            <TouchableOpacity opacity={0.8}  style={styles.textUploadContainer}>
            <Icon
              name="camera"
              type="font-awesome"
              size={10}
              reverse
              color="#078586"
              containerStyle={{ zIndex: 20, opacity: 1}}
            />
                <Text style={styles.imageLabel}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} opacity={0.8}  style={styles.textUploadContainer}>
            <Icon
              name="photo"
              type="font-awesome"
              size={10}
              reverse
              color="#078586"
              containerStyle={{ zIndex: 20, opacity: 1}}
            />
                <Text style={styles.imageLabel}>Select Photo</Text>
            </TouchableOpacity>
           
        </View>
      </View>
    </View>
  )
}

export default ImageUpload

const styles = StyleSheet.create({
    imageContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:10

    },
    imageStyle:{
        width: 200,
        height: 170,
        borderRadius: 10,
        marginTop: 10
    },
    textUploadContainer:{
        width: 160,
        height: 80,
       backgroundColor: 'rgba(7, 133, 134,0.2)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // opacity: 0.3
    },
    imageLabel:{
        fontSize: 14,
        color: '#078586',
        fontWeight: 'bold',
        opacity: 1
    },
    headerText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#078586',
        marginTop: 15,
        marginBottom: 10
    }
    
})