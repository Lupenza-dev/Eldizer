import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Icon } from 'react-native-elements';



const DropdownComponent = (props) => {
  const [value, setValue] = useState(null);
  const apiData =props.data.data ?? [];
  const datas = apiData.map(item => ({
    label: item.name,
    value: item.id.toString(), // Convert id to string if needed
  }));
  return (
    <View  style={{ paddingTop: 10}}>
          <Text style={styles.textlabel}>{props.label}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={datas}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={`Select ${props.label}`}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
               // alert(item.value);
               props.onChange;
            }}
            onChangeText={props.onchangeText}
            onPress={props.onClick}
            
            renderLeftIcon={() => (
                // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                <Icon
                name="location-pin"
                type="Ionicons"
                size={20}
                color="#078586"
                style={styles.icon}
              />
            )}
            />
    </View>
    
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#078586',
    borderRadius: 10,
    padding: 10,
    marginTop: 5
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textlabel:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: "#078586"
}
});