import React, { useContext, useEffect, useState } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View ,Text, StyleSheet,Image, StatusBar, TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const DrawerNavigationExtended = (prop) => {
  const navigation = useNavigation();
  const [data ,setData] =useState(null);

  const {customerName} =useContext(AuthContext);
  const {email} =useContext(AuthContext);
  const {image} =useContext(AuthContext);
  const {logout} =useContext(AuthContext);
  

  // useEffect(() => {
  //   setData(JSON.parse(customer));
  // }, []);

  // console.log(image);
  return (
    <>
    {/* <StatusBar
    animated={true}
    color="red"
  /> */}
   
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-between'}}>
      <View>
        <View style={styles.topContainer}>
        </View>
        <View style={styles.imgContainer}>
          <View>
            {/* <Image
              style={styles.userImg}

              source={image ? { uri: image ?? null } : require('../assets/userImage.png')}
            /> */}
            <Image
              style={styles.userImg}
              source={require('../assets/userImage.png')}
            />
            {/* <Image
            style={styles.userImg}
            source={
              image && typeof image === 'string' && image.trim() !== ''
                ? { uri: image }
                : require('../assets/userImage.png')
            }
          /> */}
          </View>
          <View>
             <Text style={styles.title}>{customerName ?? "Name"}</Text>
             <Text>{email ?? "Email"}</Text>
          </View>
        </View>
        <View style={styles.subDividerContainer}>
        <Text style={styles.textDivider}>Student Details</Text>
        </View>
        <View>
        <TouchableOpacity onPress={ ()=>navigation.navigate('ProfileScreen')}  style={styles.drawerlinkContainer} activeOpacity={0.8} >
          <Icon
            name="user"
            type="antdesign"
            size={17}
            color="#606060"
          />
          <Text style={styles.linkText}>Profile Info</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate("CollegeProfileScreen")} style={styles.drawerlinkContainer} activeOpacity={0.8} >
          <Icon
              name="graduation-cap"
              type="font-awesome"
              size={17}
              color="#606060"
            />
          <Text style={styles.linkText}>College Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>navigation.navigate('AddressProfileScreen')} style={styles.drawerlinkContainer} activeOpacity={0.8} >
          <Icon
              name="address-book-o"
              type="font-awesome"
              size={17}
              color="#606060"
            />
          <Text style={styles.linkText}>Address Info</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.subDividerContainer}>
        <Text style={styles.textDivider}>Eldizer Finance</Text>
        </View>
        <View>
        <TouchableOpacity style={styles.drawerlinkContainer} onPress={() =>navigation.navigate('TermsScreen')}  activeOpacity={0.8} >
          <Icon
              name="filetext1"
              type="antdesign"
              size={17}
              color="#606060"
            />
          <Text style={styles.linkText}>Terms & Condition</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerlinkContainer} onPress={() =>navigation.navigate('ContactScreen')} activeOpacity={0.8} >
          <Icon
              name="phone"
              type="font-awesome"
              size={17}
              color="#606060"
            />
          <Text style={styles.linkText}>Contact Us</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.drawerlinkContainer} activeOpacity={0.8}>
          <Icon
              name="link"
              type="antdesign"
              size={17}
              color="#606060"
            />
          <Text style={styles.linkText}>Unlink NMB Account</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.drawerlinkContainer} activeOpacity={0.8} onPress={() => logout()}>
          <Icon
              name="logout"
              type="antdesign"
              size={17}
              color="#606060"
            />
          <Text style={styles.linkText}>Logout</Text>
        </TouchableOpacity>
        </View>
        
        {/* <DrawerItemList {...prop}/> */}
      </View>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ fontWeight: '300'}}>This App is Owned By</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15}}>Eldizer-Finance Ltd</Text>
      </View>
      </View>
    </DrawerContentScrollView>
    </>
  )
}

const styles =StyleSheet.create({
    topContainer:{
      height: 170,
      backgroundColor: "#272F3B",
      marginTop: -80,
    },
    userImg:{
      height: 100,
      width: 100,
      borderRadius: 50,
      borderColor: "white",
      borderWidth: 4,
      borderColor: '#F7F7F8',
      marginBottom: 2
    },
    imgContainer:{
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: -45
    },
    title:{
      color: "#272F3B",
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    textDivider:{
      fontSize: 15,
      paddingLeft: 10,
      fontWeight: '500'
     // borderBottomColor: '#272F3B',
     // borderBottomWidth: 1,
     // paddingBottom: 5
    },
    subDividerContainer:{
      height: 40,
      flexDirection: 'row',
      backgroundColor: '#F7F7F8',
      alignItems: 'center',
      marginVertical: 5
    },
    drawerlinkContainer:{
      height: 50,
      flexDirection: 'row',
      backgroundColor: 'rgba(7, 133, 134,0.1)',
      alignItems: 'center',
      marginVertical: 2,
      marginHorizontal: 5,
      borderRadius: 10,
      gap: 10,
      paddingLeft: 15
    },
    linkText:{
      fontSize: 15,
      fontWeight: '500'
    }

})

export default DrawerNavigationExtended