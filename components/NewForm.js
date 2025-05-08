import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../utils/GlobalStyles';

const NewForm = (props) => {
  //  console.log(props.value,'value');
  let errorMessage =props.error;
  let value =props.value;
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value != null) {
      setIsFocused(true);
    }else{
      setIsFocused(false);

    }
  };


  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
        <Icon
          name={props.icon_name}
          type={props.icon_type}
          size={25}
          color={isFocused ? colors.primary : 'grey'}
        />
        <TextInput
          style={[styles.input]}
          placeholder={isFocused || text ? '' : props.label}
          placeholderTextColor="grey"
          onFocus={handleFocus}
          onBlur={handleBlur}
          // onChangeText={setText}
          onChangeText={(setText,props.onChangeText)}
          value={value}
          secureTextEntry={props.secureText}
        />
      </View>
      {(isFocused || text) && (
        <Text style={[styles.floatingLabel, isFocused && styles.floatingLabelFocused]}>
          {props.label}
        </Text>
      )}
            {(errorMessage && !value) && (<Text style={styles.error}>{errorMessage}</Text>)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 0.3,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#EBECEF'
  },
  input: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  floatingLabel: {
    position: 'absolute',
    left: 35,
    top: -7,
    fontSize: 12,
    color: 'grey',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  floatingLabelFocused: {
    color: colors.primary,
  },
  errorFloatingLabelFocused: {
    color: colors.danger,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2
  }
});

export default NewForm;
