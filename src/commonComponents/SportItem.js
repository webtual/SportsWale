import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "../constants/CustomeColor";
import { FontSize, MEDIUM, SEMIBOLD } from "../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { dim_grey, secondary, white } from "../constants/Color";
import { user_data } from "../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import { widthPixel } from "./ResponsiveScreen";

export default function SportItem({
  item,
  index,
  isSelected,
  onPressItem,
  isDisabled,
  activeOpacity = 0.6,
  borderColor = dim_grey,
  textColor= dim_grey
}) {
  const userData = useSelector(user_data);

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor : isSelected ? secondary : borderColor,
        marginRight: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: isSelected ? secondary : white,
        marginVertical: 5,
      }}
      activeOpacity={activeOpacity}
      disabled={isDisabled}
      onPress={() => onPressItem(index)}
    >
      {/* <Icon
      name={'basketball'} 
      size={16}
      color={isSelected ? Colors.white : Colors.black}
    /> */}
      <Image
        source={{ uri: userData?.asset_url + item?.game_image }}
        style={{ width: widthPixel(16), height: widthPixel(16), resizeMode : 'contain', tintColor : isSelected ? white : textColor }}
      />
      <Text
        style={[styles.menuItemText,{color : textColor}, isSelected && styles.selectedItemText]}
      >
        {item.game_title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItemText: {
    color: dim_grey,
    paddingVertical: 5,
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_14,
    marginLeft: 5,
  },
  selectedItemText: {
    color: white,
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_14,
  },
});
