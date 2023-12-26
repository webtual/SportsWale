import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Colors } from '../constants/CustomeColor';
import { SEMIBOLD , FontSize } from '../constants/Fonts';

const CustomPrice = ({ label, iconName, iconSize = 19, iconColor = Colors.black , amount }) => {
  return (
    <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical:8
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: iconName ? FontSize.FS_15 : FontSize.FS_13,
                color: Colors.black,
                marginRight: 5,
              }}
            >
              {label}
            </Text>
            <Icon name={iconName} size={iconSize} color={iconColor} />
          </View>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: iconName ? FontSize.FS_15 : FontSize.FS_13,
              color: Colors.black,
            }}
          >
            INR {amount}
          </Text>
        </View>
  );
};

export default CustomPrice;
