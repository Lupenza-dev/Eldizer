import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'; 


const Search = () => {
  return (
    <View style={styles.inputContainer}>
      
    <TextInput style={styles.input} placeholder='Search ......' />
    <Icon onPress={()=>{alert('clicked')}}
   style={styles.searchIcon}
    name='search1'
    type='antdesign'
    color='#606060'
    />
</View> 
  )
}

export default Search

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 10,
        width: '81%',
    },
    inputContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#838799",
        marginHorizontal: 15,
        height: 45,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#F1F2F3'
    },
    searchIcon:{
        paddingRight: 10
    }
})