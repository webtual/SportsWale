import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/CustomeColor'
import { FontSize , MEDIUM } from '../constants/Fonts'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SportItem({ item, index, isSelected, onPressItem , isDisabled }) {
  return (
    <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      height: 30,
      borderWidth: 0.5,
      marginRight: 15,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: isSelected ? Colors.secondary : null,
      marginVertical: 10,
    }}
    disabled={isDisabled}
    onPress={() => onPressItem(index)}
  >
    <Icon
      name={'basketball'} 
      size={16}
      color={isSelected ? Colors.white : Colors.black}
    />
    <Text
      style={[
        styles.menuItemText,
        isSelected && styles.selectedItemText, 
      ]}
    >
      {item.SportName}
    </Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    menuItemText: {
        color: Colors.black,
        paddingVertical: 5,
        fontFamily: MEDIUM,
        fontSize: FontSize.FS_14,
        marginLeft: 5,
      },
      selectedItemText: {
        color: Colors.white,
        fontFamily: MEDIUM,
        fontSize: FontSize.FS_14,
      },
})