import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import MediumText from './MediumText';

const FormInput = (props) => {
  return (
    <View style={{ paddingTop: 10}}>
      <MediumText style={styles.textlabel} text={props.label} />
      <View style={[styles.input]}> 
      <Icon
        name={props.iconName ?? null}
        type={props.iconType ?? null}
        size={18}
        color="#272F3B"
      />
      <TextInput 
      maxLength={props.inputlength ?? null}
      style={styles.inputView} 
      autoCorrect={false}  
      placeholder={props.placeholder}
       onChangeText={props.onChangeText} 
       value={props.value ?? null}
       secureTextEntry={props.secureText} />
      </View>
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    input:{
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderColor: '#272F3B',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    textlabel:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        color: "#272F3B"
    },
    inputView:{
      height: 60,
      width: '100%',
    }
})